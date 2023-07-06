import Sidebar from "./Sidebar/Sidebar.js";
import Document from "./Document/Document.js";
import { initRoute } from "../router.js";

export default function App({ $target }) {
  let isFirstRoute = true;

  const sidebar = new Sidebar({
    $target,
    onResetDocumentState: () => {
      document.setState({ id: null });
    },
  });

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

      if (isFirstRoute) {
        document.setState({ id: null });
        isFirstRoute = false;
      }

      document.setState({ id: documentId });
    } else {
      document.setState("/");
    }
  };

  this.route();

  initRoute(() => this.route());

  window.addEventListener("popstate", () => {
    this.route();
  });
}
