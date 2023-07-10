export default function DocumentList({
  $target,
  initialState,
  addList,
  deleteList,
  pageRender,
}) {
  const $div = document.createElement("div");
  $target.appendChild($div);

  // div안에다가..!
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderUI = (nextDocument) => `
    ${nextDocument
      .map(
        ({ id, title, documents }) => `
      <ul>
        <li data-id="${id}" class="list">
          <a class="link" href="/documents/${id}" data-id="${id}">제목 : ${title}</a>
          <button class="add-list">+</button>
          <button class="delete-list">-</button>
        </li>
        ${documents.length && renderUI(documents)}
      </ul>
    `
      )
      .join("")}
  `;

  // 이벤트 중첩 (window -> $div로 해결)
  // 버블링을 할 때 window가 아니라 그 컴포넌트로 최대한 범위를 줄인다.
  $div.addEventListener("click", (e) => {
    if (e.target.className === "add-list") {
      const li = e.target.closest(".list");
      const { id } = li.dataset;
      addList(id); // 일단 id가 문자열로 넘어감!
    } else if (e.target.className === "delete-list") {
      const li = e.target.closest(".list");
      const { id } = li.dataset;
      deleteList(id);
    } else if (e.target.className === "link") {
      const { id } = e.target.dataset;
      pageRender(id); // id로 페이지 랜더링 해달라고 요청!
    } else return;
  });

  this.render = () => {
    $div.innerHTML = renderUI(this.state); // 다시 그린다.
  };
}
