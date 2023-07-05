import DocumentList from "./DocumentList.js";
import { request } from "../api/api.js";
import Header from "./Header.js";
import { listRoute } from "../utils/router.js";

//Sidebar
export default function documentPage({ $target }) {
  const $documentPage = document.createElement("div");
  $documentPage.className = "document-page";

  new Header({
    $target: $documentPage,
    initialState: "주다현",
  });

  const documentList = new DocumentList({
    $target: $documentPage,
    initialState: [],
  });

  const fetchDocuments = async () => {
    const documents = await request("/");
    documentList.setState(documents);
  };

  this.render = async () => {
    await fetchDocuments();
    $target.prepend($documentPage);
  };

  this.route = () => {
    this.setState();
  };

  listRoute(() => fetchDocuments());
}
