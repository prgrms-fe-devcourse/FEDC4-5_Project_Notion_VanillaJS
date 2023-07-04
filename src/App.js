import { request } from "./api.js";
import DocumentPage from "./DocumentPage.js";
import DocumentEditPage from "./DocumentEditPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  this.state = {
    docId: null,
    docs: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    documentPage.setState(nextState);
  };

  //sidebar-container
  const documentPage = new DocumentPage({
    $target,
    initialState: {
      docId: null,
      docs: [],
    },
  });

  //editor-container
  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      docId: "new",
      doc: {
        title: "",
        content: "",
      },
    },
  });

  this.route = async () => {
    await fetchDocuments();

    const { pathname } = window.location;

    if (pathname === "/") {
      documentPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , docId] = pathname.split("/");
    }
  };

  const fetchDocuments = async () => {
    const docs = await request("/documents", {
      method: "GET",
    });

    this.setState({
      ...this.state,
      docs,
    });
  };

  this.route();

  initRouter(() => this.route());

  window.addEventListener("popstate", () => this.route());
}
