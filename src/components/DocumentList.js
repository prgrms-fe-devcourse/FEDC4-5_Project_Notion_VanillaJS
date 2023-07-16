import { getItem, setItem, storageKey } from "../util/storage.js";

export default function DocumentList({
  $target,
  initialState,
  onContentView,
  onRemove,
  onAdd,
}) {
  const $page = document.createElement("div");

  $page.setAttribute("class", "global-nav");
  $target.appendChild($page);
  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };
  let isClicked = {};
  this.render = () => {
    if (this.state.selectedDocument) {
      const { id, title } = this.state.selectedDocument;
      const $selectedDiv = $target.querySelector(
        `div[data-document-id="${id}"]`
      );
      const $selectedTitle = $selectedDiv.querySelector(".document-title");

      $selectedTitle.textContent = title;
    }
  };
  this.render();
}
