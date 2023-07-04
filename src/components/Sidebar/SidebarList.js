export default function SidebarList({ $target, initialState }) {
  const $sidebarList = document.createElement("div");

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

  const renderDocumentsList = (lists, depth = 0) => {
    tem += `<ul>`;
    lists.forEach(({ id, title, documents }) => {
      tem += `<li data-id=${id}>`;
      tem += `<div style="padding-left: ${depth}px">${
        title === null || title.trim() === "" ? "Untitled" : title
      }`;
      tem += `<div><button class="add">+</button>`;
      tem += `<button class="delete">-</button></div></div>`;
      documents.length ? renderDocumentsList(documents, depth + 1) : "";
      tem += `</li>`;
    });
    tem += `</ul>`;
  };
}
