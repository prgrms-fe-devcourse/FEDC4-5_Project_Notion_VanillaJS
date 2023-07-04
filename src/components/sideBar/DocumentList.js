import DocumentListItem from "./DocumentListItem.js";
import { request } from "../../api.js";

export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement("ul");
  $documentList.setAttribute("id", "documentList");
  $target.appendChild($documentList);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.state.map((document) => {
      const initialState = {
        title: document.title,
        id: document.id,
        documents: document.documents,
      };
      new DocumentListItem({
        $target: $documentList,
        initialState,
      });
    });
  };
  this.render();
}
