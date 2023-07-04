import Sidebar from "./Sidebar/Sidebar.js";
import Document from "./Document/Document.js";

export default function App({ $target }) {
  const sidebar = new Sidebar({ $target });

  const document = new Document({
    $target,
    initialState: {
      id: null,
      title: null,
      document: null,
      createdAt: null,
      updatedAt: null,
    },
  });

  sidebar.setState();

  document.setState({ id: 79805 });
}
