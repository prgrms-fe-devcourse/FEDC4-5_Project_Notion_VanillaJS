import Layout from "./components/common/Layout.js";
import Edit from "./components/domain/Edit.js";
import Home from "./components/domain/Home.js";
import { PATH } from "./constants/path.js";
import { initRouter } from "./utils/route.js";

/**
 * @todo 라우팅 구분하기
 * @param {{appElement: Element | null}}
 */

export default function App({ appElement }) {
  if (!new.target) return new App(...arguments);

  const layoutComponent = new Layout({ appElement });
  const homeComponent = new Home({ appElement });
  const editComponent = new Edit({ appElement });

  window.addEventListener("popstate", () => {
    this.route();
  });

  initRouter(() => this.route());

  this.route = () => {
    appElement.innerHTML = ``;

    const { pathname } = window.location;

    layoutComponent.render();
    if (pathname === PATH.HOME) {
      homeComponent.render();
    } else if (pathname === "/document/edit") {
      editComponent.render();
    }
  };
}
