import { getDocuments, putDocument } from "./api/document.js";
import Layout from "./components/common/Layout.js";
import DocumentList from "./components/domain/DocumentList.js";
import DocumentEditor from "./components/domain/DocumentEditor.js";
import Home from "./components/domain/Home.js";
import { PATH } from "./constants/path.js";
import { initRouter } from "./utils/route.js";
import { getItem, setItem } from "./utils/storage.js";
import RecurDocumentList from "./components/template/RecurDocumentList.js";

/**
 * @param {{appElement: Element | null}}
 */

export default function App({ appElement }) {
  if (!new.target) return new App(...arguments);

  let timer = null;

  this.state = [];

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const layoutComponent = new Layout({ appElement });
  const documentListComponent = new DocumentList({
    appElement,
    renderItemComponent: async (parentElement) => {
      const list = await getDocuments();
      this.setState(list);
      setItem("documents", list);
      return RecurDocumentList(this.state, parentElement, () => {
        documentListComponent.render();
        documentEditorComponent.render();
      });
    },
  });
  const homeComponent = new Home({ appElement });
  const documentEditorComponent = new DocumentEditor({
    appElement,
    onEditing: (document) => {
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
        documentListComponent.render();
        documentEditorComponent.render();
      }, 1000);
    },
  });

  window.addEventListener("popstate", () => {
    this.route();
  });

  initRouter(() => this.route());

  this.init = () => {
    layoutComponent.render();
    documentListComponent.render();
    this.route();
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
