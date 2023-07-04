import { push } from "../../utils/router.js";

export default function DocumentListItem({ $target, initialState }) {
  const $documentListItem = document.createElement("li");
  $documentListItem.setAttribute("class", "listItem");
  $target.appendChild($documentListItem);

  this.state = initialState;

  this.render = () => {
    $documentListItem.innerHTML = `
      <span> > ${this.state.title}</span>
    `;
  };
  this.render();

  $documentListItem.addEventListener("click", () => {
    push(`/documents/${this.state.id}`);
  });
}
