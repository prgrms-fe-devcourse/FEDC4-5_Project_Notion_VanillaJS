import once from "@Utils/once";
import { isConstructor, validateDrawerItemState } from "@Utils/validation";
import "./DrawerItem.css";
import { deleteDocument, postDocument } from "@Utils/apis";
import { patchSidebarState, setStateOf } from "@Utils/stateSetters";
import { routeToDocument, routeToHome } from "@Utils/router";
import { CONSTRUCTOR_NAME, EVENT } from "@Utils/constants";
import openIcon from "@Static/openIcon.svg";
import plusIcon from "@Static/plusIcon.svg";
import trashIcon from "@Static/trashIcon.svg";
import Drawer from "./Drawer";

export default function DrawerItem({ $target, $sibling, parent, level }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $item = document.createElement("div");
  const $titleContainer = document.createElement("div");
  const $childrenDrawer = new Drawer({
    $target: $item,
    parent: this,
    level: level + 1,
  });

  this.state = { id: 0, title: "", documents: [] };

  this.setState = (nextState) => {
    if (!validateDrawerItemState(nextState)) {
      return;
    }

    this.state = nextState;

    this.render();
  };

  this.parent = parent;

  this.disable = false;

  this.opened = false;

  this.setOpened = (nextOpened) => {
    this.opened = nextOpened;
    this.toggleOpen();
  };

  this.toggleOpen = () => {
    const $openBtn = $item.querySelector(".drawer-item-open-button");
    $openBtn.className = `drawer-item-open-button${
      this.opened ? " opened" : ""
    }`;

    $childrenDrawer.root.style.display = this.opened ? "block" : "none";
  };

  // 강조를 위해 부모 DrawerItem을 순회하면서 다 open시킴
  this.openParents = () => {
    let curParent = parent;
    while (curParent) {
      curParent.setOpened(true);
      curParent = curParent.parent;
    }
  };

  // 부모 순회하며 Header에서 쓸 정보 수집 후 전달
  this.sendHeaderDocsInfo = () => {
    const docsInfo = [
      {
        id: this.state.id,
        title: this.state.title,
      },
    ];

    let curParent = parent;
    while (curParent) {
      docsInfo.unshift({
        id: curParent.state.id,
        title: curParent.state.title,
      });

      curParent = curParent.parent;
    }

    setStateOf(CONSTRUCTOR_NAME.HEADER, docsInfo);
  };

  // url로 문서 활성화 여부 검사 후 맞으면 본인 강조
  this.activate = () => {
    if (isActivated(this.state.id)) {
      $titleContainer.className = "drawer-item-container activated";
      this.openParents();
      this.sendHeaderDocsInfo();

      const { id, title } = this.state;
      setStateOf(CONSTRUCTOR_NAME.DASHBOARD, { id, title });
    } else {
      $titleContainer.className = "drawer-item-container";
    }
  };

  this.updateTitle = (title) => {
    this.setState({
      ...this.state,
      title: title.length === 0 ? "제목없음" : title,
    });
  };

  this.init = once(() => {
    $target.insertBefore($item, $sibling);
    $item.insertAdjacentElement("afterbegin", $titleContainer);

    $titleContainer.className = "drawer-item-container";
    $titleContainer.style.paddingLeft = `${10 * level}px`;
    $titleContainer.innerHTML = `
      <button class="drawer-item-open-button" data-action="open">${openIcon}</button>
      <p class="drawer-item-title" data-action="route">${this.state.title}</p>
      <div class="drawer-item-btn-container">
        <button data-action="remove">${trashIcon}</button>
        <button data-action="append">${plusIcon}</button>
      </div>
    `;

    $titleContainer.addEventListener("click", async (e) => {
      if (this.disable) return;

      const $actionElement = e.target.closest("[data-action]");
      if (!$actionElement) return;

      const { action } = $actionElement.dataset;

      if (action === "open") {
        this.setOpened(!this.opened);
      } else if (action === "append") {
        const newDocument = await postDocument({
          title: "제목없음",
          parent: this.state.id,
        });
        if (newDocument) {
          patchSidebarState();
          this.setOpened(true);
        }
      } else if (action === "remove") {
        this.disable = true;

        const result = await deleteDocument({ documentId: this.state.id });
        if (result) {
          patchSidebarState();
          window.removeEventListener(EVENT.ROUTE_DRAWER, this.activate);
          window.removeEventListener(EVENT.TITLE_UPDATED, this.updateTitle);

          setStateOf(CONSTRUCTOR_NAME.DASHBOARD, {
            id: this.state.id,
            toRemove: true,
          });

          if (isActivated(this.state.id)) {
            routeToHome();
          }
        } else {
          this.disable = true;
        }
      } else if (action === "route") {
        routeToDocument(this.state.id);
      }
    });

    window.addEventListener(EVENT.ROUTE_DRAWER, this.activate);
    window.addEventListener(EVENT.TITLE_UPDATED, (e) => {
      const { id, title } = e.detail;
      if (id === this.state.id) this.updateTitle(title);
    });

    this.activate();
    this.toggleOpen();
  });

  this.render = () => {
    this.init();

    const $title = $item.querySelector(".drawer-item-title");
    $title.innerText = this.state.title;

    $childrenDrawer.setState(this.state.documents);

    if (isActivated(this.state.id)) {
      this.sendHeaderDocsInfo();
    }
  };
}

function isActivated(id) {
  const { pathname } = window.location;
  if (pathname.indexOf("/documents/") !== 0) {
    return false;
  }

  const [, , documentIdStr] = pathname.split("/");
  const documentId = parseInt(documentIdStr, 10);

  return documentId === id;
}
