export default function Editor({ $target, initialState }) {
  const $editor = document.createElement("div");
  $editor.setAttribute("id", "editor");

  $editor.innerHTML = `
    <input type="text" name="title" id="title"/>
    <textarea name="content" placeholder="내용을 입력하세요" id="content" />
  `;

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.appendChild($editor);
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
  };
}
