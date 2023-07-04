import Sidebar from "./Sidebar/Sidebar.js";
import Document from "./Document/Document.js";
import { initRoute } from "../router.js";

export default function App({ $target }) {
  const sidebar = new Sidebar({ $target });

  const document = new Document({
    $target,
    initialState: {
      id: null,
      title: "",
      document: [],
      createdAt: "",
      updatedAt: "",
    },
    onFetchSidebar: () => {
      sidebar.setState();
    },
  });

  sidebar.setState();

  this.route = () => {
    const { pathname } = location;

    if (pathname === "/") {
      document.setState({ id: null });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");

      document.setState({ id: documentId });
    }
  };

  this.route();

  initRoute(() => this.route());

  window.addEventListener("popstate", () => {
    this.route();
  });
}
