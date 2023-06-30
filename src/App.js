import { initRouter } from "./utils/route.js";

/**
 * @todo 라우팅 구분하기
 * @param {{appElement: Element | null}}
 */

export default function App({ appElement }) {
  if (!new.target) return new App(...arguments);

  window.addEventListener("popstate", () => {
    this.route();
  });

  initRouter(() => this.route());

  this.route = () => {
    appElement.innerHTML = ``;

    const { pathname } = window.location;

    if (pathname === "/") {
      appElement.innerHTML = `Home`;
    }
  };
}
