import { isConstructor, validateDocumentListState } from "@Utils/validation";
import "./Sidebar.css";
import once from "@Utils/once";
import { postDocument } from "@Utils/apis";
import { patchSidebarState } from "@Utils/stateSetters";
import addIcon from "@Static/addIcon.svg";
import { routeToHome } from "@Utils/router";
import DocumentList from "./DocumentList";

export default function Sidebar({ $target }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $sidebar = document.createElement("aside");
  const $homeLogo = document.createElement("p");
  const $addBtn = document.createElement("button");
  const $rootDocumentList = new DocumentList({
    $target: $sidebar,
    parent: null,
    level: 0,
  });

  this.state = [];

  this.setState = (nextState) => {
    if (!validateDocumentListState(nextState)) {
      return;
    }

    this.state = nextState;

    this.render();
  };

  this.init = once(() => {
    $sidebar.className = "sidebar";
    $target.appendChild($sidebar);

    $addBtn.innerText = "새 페이지";
    $addBtn.insertAdjacentHTML("afterbegin", addIcon);
    $addBtn.className = "sidebar-add-btn";

    $homeLogo.className = "sidebar-logo";
    $homeLogo.innerText = "신호원의 Hotion";
    $sidebar.appendChild($homeLogo);
    $sidebar.appendChild($addBtn);

    $homeLogo.addEventListener("click", () => {
      routeToHome();
    });

    $addBtn.addEventListener("click", async () => {
      const newDocument = await postDocument({
        title: "제목없음",
        parent: null,
      });
      if (newDocument) {
        patchSidebarState();
      }
    });
  });

  this.render = () => {
    this.init();
    $rootDocumentList.setState(this.state);
  };

  this.render();
}
