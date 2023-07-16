import DocumentsPage from "./page/DocumentsPage.js";
import EditorPage from "./page/EditorPage.js";
import { request } from "./util/api.js";
import { initRoute } from "./util/router.js";

export default function App({ $target }) {
  this.state = {
    selectedDocument: "",
  };

  this.setState = (newState) => {
    this.state = newState;
    documentsPage.setState({
      selectedDocument: this.state.selectedDocument,
    });
  };

  const documentsPage = new DocumentsPage({ $target });

  const editorPage = new EditorPage({
    $target,
    onTitleEdit: (selectedDocument) => {
      this.setState({ selectedDocument });
    },
  });

  this.route = async () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      editorPage.setState({ ...editorPage.state, selectedDocumentId: null });
    } else if (pathname.includes("/documents/")) {
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
