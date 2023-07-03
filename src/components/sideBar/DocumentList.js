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

  console.log("this.state", this.state);

  this.render = () => {
    this.state.map((document) => {
      new DocumentListItem({
        $target: $documentList,
      });
    });
  };
  this.render();
}
