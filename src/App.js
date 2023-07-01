import { getDocuments } from "./api/document.js";
import Layout from "./components/common/Layout.js";
import DocumentItem from "./components/domain/DocumentItem.js";
import DocumentList from "./components/domain/DocumentList.js";
import Edit from "./components/domain/Edit.js";
import Home from "./components/domain/Home.js";
import { PATH } from "./constants/path.js";
import { initRouter } from "./utils/route.js";

/**
 * @param {{appElement: Element | null}}
 */

export default function App({ appElement }) {
  if (!new.target) return new App(...arguments);

  const layoutComponent = new Layout({ appElement });
  const documentListComponent = new DocumentList({
    appElement,
    renderItemComponent: async (parentElement) => {
      const list = await getDocuments();
      return list.map((item) =>
        new DocumentItem({ parentElement, ...item }).render()
      );
    },
  });
  const homeComponent = new Home({ appElement });
  const editComponent = new Edit({ appElement });

  window.addEventListener("popstate", () => {
    this.route();
  });

  initRouter(() => this.route());

  this.route = () => {
    const { pathname } = window.location;

    appElement.innerHTML = ``;

    layoutComponent.render();
    documentListComponent.render();

    if (pathname === PATH.HOME) {
      homeComponent.render();
    } else if (pathname === "/document/edit") {
      editComponent.render();
    }
  };
}
