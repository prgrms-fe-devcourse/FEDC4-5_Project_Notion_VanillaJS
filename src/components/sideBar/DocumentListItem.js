import { push } from "../../utils/router.js";
import DocumentList from "./DocumentList.js";

export default function DocumentListItem({
  $target,
  initialState,
  onAdd,
  onDelete,
}) {
  const $documentListItem = document.createElement("li");
  const $subDocumentList = document.createElement("ul");
  $subDocumentList.setAttribute("class", "subDocumentList");
  $target.appendChild($documentListItem);
  $target.appendChild($subDocumentList);

  this.state = initialState;

  this.render = () => {
    const { pathname } = window.location;
    const isActive = pathname === `/documents/${this.state.id}`;
    $documentListItem.innerHTML = `
      <div class="listItem${isActive ? " activeListItem" : ""}">
        <div class="listItemInfo">
          <span class="toggleButton">> </span>
          <span class="itemTitle">${
            this.state.title ? this.state.title : "제목 없음"
          }</span>
        </div>
        <div class="listItemTools">
          <i class="addButton fa-solid fa-plus"></i>
          <i class="deleteButton fa-regular fa-trash-can"></i>
        </div>
      </div>
    `;
    this.state.documents &&
      this.state.documents.length !== 0 &&
      new DocumentList({
        $target: $subDocumentList,
        initialState: this.state.documents,
      });
  };
  this.render();

  $documentListItem.addEventListener("click", async (e) => {
    const { classList } = e.target;
    const classArray = Array.from(classList);
    if (classArray.includes("toggleButton")) {
    } else if (classArray.includes("addButton")) {
      onAdd();
      return;
    } else if (classArray.includes("deleteButton")) {
      onDelete(this.state.id);
      return;
    }
    push(`/documents/${this.state.id}`);
  });
}
