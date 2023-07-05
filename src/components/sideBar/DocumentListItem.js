import { request } from "../../api.js";
import { push } from "../../utils/router.js";
import DocumentList from "./DocumentList.js";

export default function DocumentListItem({ $target, initialState }) {
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
          <span class="itemTitle">${this.state.title}</span>
        </div>
        <div class="addButton">+</div>
      </div>
    `;
    this.state.documents.length !== 0 &&
      new DocumentList({
        $target: $subDocumentList,
        initialState: this.state.documents,
      });
  };
  this.render();

  $documentListItem.addEventListener("click", async (e) => {
    const { className } = e.target;
    if (className === "toggleButton") {
    } else if (className === "addButton") {
      const createdSubDocument = await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: this.state.id,
        }),
      });
      push(`/documents/${createdSubDocument.id}`);
      return;
    }
    push(`/documents/${this.state.id}`);
  });
}
