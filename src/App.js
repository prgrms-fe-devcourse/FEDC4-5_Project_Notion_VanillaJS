import DocumentsPage from "./DocumentsPage.js";
import EditorPage from "./EditorPage.js";
import { request } from "./api.js";
import { initRoute } from "./router.js";

export default function App({ $target }) {
  new DocumentsPage({ $target });

  const editorPage = new EditorPage({ $target });

  this.route = async () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      editorPage.setState({ ...editorPage.state, selectedDocumentId: null });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , selectedDocumentId] = pathname.split("/");
      const documentContent = await request(
        `/documents/${selectedDocumentId}`,
        {
          method: "GET",
        }
      );
      editorPage.setState({
        ...this.state,
        documentContent,
        selectedDocumentId,
      });
    }
  };

  initRoute(() => this.route());

  this.route();

  window.addEventListener("popstate", () => {
    this.route();
  });
}
