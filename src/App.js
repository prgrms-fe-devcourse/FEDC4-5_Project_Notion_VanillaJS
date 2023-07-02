import { getDocuments, putDocument } from "./api/document.js";
import Layout from "./components/common/Layout.js";
import DocumentList from "./components/domain/DocumentList.js";
import Document from "./components/domain/Document.js";
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

  const layoutComponent = new Layout({ appElement });
  const documentListComponent = new DocumentList({
    appElement,
    renderItemComponent: async (parentElement) => {
      const list = await getDocuments();
      setItem("documents", list);
      return RecurDocumentList(getItem("documents"), parentElement);
    },
  });
  const homeComponent = new Home({ appElement });
  const documentComponent = new Document({
    appElement,
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await putDocument({
          documentId: document.documentId,
          data: document,
        });

        this.route();
      }, 1000);
    },
  });

  window.addEventListener("popstate", () => {
    this.route();
  });

  initRouter(() => this.route());

  this.state = getItem("documents", []);

  this.route = () => {
    const { pathname } = window.location;

    appElement.innerHTML = ``;

    layoutComponent.render();
    documentListComponent.render();

    if (pathname === PATH.HOME) {
      homeComponent.render();
    } else if (pathname.split("/")[1] === "documents") {
      documentComponent.render();
    }
  };
}
