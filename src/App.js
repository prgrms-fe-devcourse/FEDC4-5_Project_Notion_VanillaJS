import { request } from "./api.js";
import DocumentPage from "./DocumentPage.js";
import DocumentEditPage from "./DocumentEditPage.js";

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
    documentPage.render();
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
}
