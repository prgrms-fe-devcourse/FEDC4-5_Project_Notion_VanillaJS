import { putDocument } from "./api/document.js";
import Layout from "./components/common/Layout.js";
import DocumentList from "./components/domain/DocumentList.js";
import DocumentEditor from "./components/domain/DocumentEditor.js";
import Home from "./components/domain/Home.js";
import { PATH } from "./constants/path.js";
import { initRouter } from "./utils/route.js";
import RecurDocumentList from "./components/template/RecurDocumentList.js";

/**
 * @param {{appElement: Element | null}}
 */

export default function App({ appElement }) {
  if (!new.target) return new App(...arguments);
  const wrapperContainer = document.createElement("div");
  const leftContainerElement = document.createElement("div");
  const rightContainerEleement = document.createElement("div");
  wrapperContainer.className = "wrapper-container";
  leftContainerElement.className = "left-container";
  rightContainerEleement.className = "right-container";

  let timer = null;

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;

    documentListComponent.render();
  };

  const layoutComponent = new Layout({ appElement });
  const documentListComponent = new DocumentList({
    parentElement: leftContainerElement,
    renderItemComponent: (parentElement) => {
      return RecurDocumentList(this.state, parentElement, (id) => {
        const newState = this.state.filter((document) => document.id !== id);

        this.setState(newState);
      });
    },
    serverRender: (newState) => this.setState(newState),
    onAddButtonClick: (newDocument) => {
      const nextState = [...this.state, newDocument];
      this.setState(nextState);
    },
  });
  const homeComponent = new Home({ appElement });
  const documentEditorComponent = new DocumentEditor({
    parentElement: rightContainerEleement,
    onEditing: (document) => {
      /**
       * @todo 자식 노드에서의 id 구하기
       */
      if (document.isChangeTitle) {
        const newState = this.state.map((data) => ({
          ...data,
          title: data.id === document.documentId ? document.title : data.title,
        }));
        this.setState(newState);
      }

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await putDocument({
          documentId: document.documentId,
          data: document,
        });
      }, 1000);
    },
  });

  window.addEventListener("popstate", () => {
    this.route();
  });

  initRouter(() => this.route());

  this.init = () => {
    documentListComponent.getServer();

    layoutComponent.render();
    documentListComponent.render();

    this.route();

    appElement.append(wrapperContainer);
    wrapperContainer.append(leftContainerElement, rightContainerEleement);
  };

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === PATH.HOME) {
      homeComponent.render();
    } else if (pathname.split("/")[1] === "documents") {
      documentEditorComponent.render();
    }
  };
}
