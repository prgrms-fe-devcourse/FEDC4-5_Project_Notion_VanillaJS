import DocumentsListItems from "./DocumentsListItems.js";
import { request } from "../../../services/api.js";
import { push } from "../../../services/router.js";
import DirItem from "./DirItem.js";

export default function DocumentsList({ $target }) {
  this.state = [];

  this.setState = async () => {
    const res = await request("/documents");
    this.state = res;
    this.render();
  };

  const $listWrapper = document.createElement("nav");
  $listWrapper.className = "documentListWrapper";
  const $documentList = document.createElement("ul");

  // root 폴더
  new DirItem({
    $target: $listWrapper,
    dirName: "/root",
    reRender: this.setState,
  });
  $listWrapper.appendChild($documentList);
  $target.appendChild($listWrapper);

  this.matchDocument = (docList, findName) => {
    for (const doc of docList) {
      if (doc.title === findName) {
        return doc;
      }
      if (doc.documents.length > 0) {
        const match = this.matchDocument(doc.documents, findName);
        if (match) {
          return match;
        }
      }
    }
  };

  this.isDocument = (findName) => {
    return this.matchDocument(this.state, findName);
  };

  const handleDocumentClick = (event) => {
    const $li = event.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    }
  };

  $documentList.addEventListener("click", handleDocumentClick);

  this.render = () => {
    $documentList.innerHTML = "";
    new DocumentsListItems({
      $target: $documentList,
      documentItems: this.state,
      reRender: this.setState,
    });
  };

  this.setState();
}
