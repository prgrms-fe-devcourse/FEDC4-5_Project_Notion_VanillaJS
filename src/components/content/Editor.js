export default function Editor({ $target, initialState }) {
  const $editor = document.createElement("div");

  $editor.innerHTML = `
    <input type="text" name="title"/>
    <div name="content" contentEditable="true"></div>
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
