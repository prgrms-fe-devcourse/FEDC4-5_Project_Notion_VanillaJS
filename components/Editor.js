export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";

  $target.appendChild($editor);

  this.state = initialState;

  let isInitialize = false;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = this.state.content;
    this.render();
  };

  this.render = () => {
    // 빈 문자열일 경우 에디터를 표시하지 않음
    if (this.state === "") {
      $editor.style.display = "none";
    } else {
      $editor.style = "";
    }
    // 에디터 편집 시 반복적으로 호출되는 render로 인한 깜빡임을 방지하기 위한 방어코드
    if (!isInitialize) {
      $editor.innerHTML = `
        <input type="text" name="title" placeholder="제목 없음" value="${this.state.title}" />
        <label for="myInput"></label>
        <div class="content" contentEditable="true" name="content">${this.state.content}</div>
      `;
      isInitialize = true;
    }
  };

  this.render();

  // 에디터 제목 편집 이벤트 리스너
  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };
    this.setState(nextState);
    onEditing(nextState);
  });

  // 에디터 콘텐츠 편집 이벤트 리스너
  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };
    onEditing(nextState);
  });
}
