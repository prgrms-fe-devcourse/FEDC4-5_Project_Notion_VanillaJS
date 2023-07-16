export default function Editor({ $target, initialState, onEditing }) {
  const $page = document.createElement("div");

  $page.setAttribute("class", "editor-page");
  $target.appendChild($page);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    $page.querySelector("[name=title]").value = this.state.title;
    $page.querySelector("[name=content]").value = this.state.content;
  };

  this.render = () => {
    $page.innerHTML = `
        <input class="editor-title" name="title" value="${this.state.title}"/>
        <textarea name="content">${this.state.content}</textarea>
        `;
  };

  this.render();

  $page.addEventListener("input", (event) => {
    const name = event.target.getAttribute("name");

    this.setState({ ...this.state, [name]: event.target.value });
    onEditing(this.state);
  });
}
