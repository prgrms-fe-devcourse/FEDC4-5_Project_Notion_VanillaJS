import { request } from "../api/api.js";
import DocumentPage from "./DocumentPage.js";
import DocumentEditPage from "./DocumentEditPage.js";
import { initRouter } from "../routes/router.js";

export default function App({ $target }) {
  this.state = {
    docId: null,
    docs: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    documentPage.setState(nextState);
  };

  const documentPage = new DocumentPage({
    $target,
    initialState: {
      docId: null,
      docs: [],
    },
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      docId: null,
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
      $target.innerHTML = "";
      documentPage.render();

      this.setState({ ...this.state });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , docId] = pathname.split("/");

      documentEditPage.setState({ docId });

      this.setState({
        ...this.state,
        docId,
      });
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
