import SideBar from "./components/sideBar/SideBar.js";
import { initRouter } from "./utils/router.js";

export default function App({ $target }) {
  const sideBar = new SideBar({ $target });

  this.route = () => {
    // $target.innerHTML = "";
    const { pathname } = window.location;

    if (pathname === "/") {
      sideBar.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      // TODO: 우측 편집기 초기화
    }
  };

  this.route();

  initRouter(() => this.route());
}
