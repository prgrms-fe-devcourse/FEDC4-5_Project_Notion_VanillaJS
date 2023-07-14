export default function NotionList({
  $target,
  initialState,
  onClickNotion,
  onAddNotion,
  onDeleteNotion,
}) {
  const $notionList = document.createElement("div");
  $notionList.className = "notionList";

  $target.appendChild($notionList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // 하위 항목 표시를 위한 콜백 함수 (재귀 구현)
    // 제목 길이를 제한하기 위한 유효성 검사 추가!
    const renderNotion = (id, title, documents) => {
      if (documents.length > 0) {
        return `
        <div>
          <li class="notion" data-id="${id}">
            <button class="dropdown"><i class="fa fa-solid fa-caret-up fa-rotate-180 fa-2xs"></i></button>
            ${title.length > 5 ? title.slice(0, 5) + "..." : title}
            <div class="btnContainer">
              <button class="removeBtn" data-id="${id}">❌</button>
              <button class="addBtn" data-id="${id}">➕</button>
            </div>
          </li> 
          <ul class="children">
            ${documents
              .map(
                ({ id, title, documents }) => `
              ${renderNotion(id, title, documents)}
            `
              )
              .join("")}
          </ul>
        </div>
        `;
      } else {
        return `
        <div>
          <li class="notion" data-id="${id}">
            <button class="dropdown"><i class="fa fa-solid fa-caret-up fa-rotate-180 fa-2xs"></i></button>
            ${title.length > 5 ? title.slice(0, 5) + "..." : title}
            <div class="btnContainer">
              <button class="removeBtn" data-id="${id}">❌</button>
              <button class="addBtn" data-id="${id}">➕</button>
            </div>
          </li>
        </div>
        `;
      }
    };

    $notionList.innerHTML = `
      <ul class="notions">
        ${this.state
          .map(
            ({ id, title, documents }) => `
              ${renderNotion(id, title, documents)}
            `
          )
          .join("")}
      </ul>
    `;
  };

  this.render();

  // 각 노션별 이벤트 리스너 (모든 이벤트는 App까지 올림)
  $notionList.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (e.target.className === "notion") {
      // 노션 전체 클릭 시 실행
      onClickNotion(id);
    } else if (e.target.className === "addBtn") {
      // 노션 안의 "+" 버튼 클릭 시 실행
      onAddNotion(id);
    } else if (e.target.className === "removeBtn") {
      // 노션 안의 "x" 버튼 클릭 시 실행
      onDeleteNotion(id);
    } else {
      const $parent = e.target.closest("li");
      const $btn = e.target.closest("button");
      if ($parent.nextElementSibling.style.display === "none") {
        $parent.nextElementSibling.style.display = "";
      } else {
        $parent.nextElementSibling.style.display = "none";
      }
      $btn.classList.toggle("rotate");
    }
  });
}
