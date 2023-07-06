import { push } from "../../router.js";

export default function SidebarList({
  $target,
  initialState,
  onAddDocument,
  onDeleteDocument,
}) {
  const $sidebarList = document.createElement("div");

  $sidebarList.classList.add("sidebar-list");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $target.appendChild($sidebarList);

  let tem = "";

  this.render = () => {
    renderDocumentsList(this.state, 0);
    $sidebarList.innerHTML = tem;
    tem = "";
  };

  $sidebarList.addEventListener("click", (e) => {
    const { className } = e.target;
    const $li = e.target.closest("li");

    if ($li) {
      const { id } = $li.dataset;

      if (id) {
        if (className.includes("delete")) {
          onDeleteDocument(id);
        } else if (className.includes("plus")) {
          onAddDocument(id);
        } else {
          push(`/documents/${id}`);
        }
      }
    }
  });

  const renderDocumentsList = (lists, depth = 0) => {
    const padding = 15;

    tem += `<ul>`;
    lists.forEach(({ id, title, documents }) => {
      tem += `<li data-id=${id}>`;
      tem += `<div class="sidebar-list__li" style="padding-left: ${
        padding * depth
      }px">${title === null || title.trim() === "" ? "Untitled" : title}`;
      tem += `<div><button class="sidebar-list__button plus">+</button>`;
      tem += `<button class="sidebar-list__button delete">-</button></div></div>`;
      documents.length ? renderDocumentsList(documents, depth + 1) : "";
      tem += `</li>`;
    });
    tem += `</ul>`;
  };
}
