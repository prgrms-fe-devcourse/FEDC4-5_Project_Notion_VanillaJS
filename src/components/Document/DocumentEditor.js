export default function DocumentEditor({ $target, initialState }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $editor.innerHTML = `
      <input name="title" type="text" style="width: 600px" value=${
        !this.state.title ? "Untitled" : this.state.title
      } />
      <textarea name="content" contentEditable="true" style="width: 600px; height: 100vh; border: 1px solid black">${
        !this.state.content ? "No Contents" : this.state.content
      }</textarea>`;

  $target.appendChild($editor);

  this.render = () => {
    $editor.querySelector("[name='title']").value = this.state.title;
    $editor.querySelector("[name='content']").value = this.state.content;
  };
}
