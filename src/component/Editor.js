function Editor({
  $page,
  initialState = { title: "", content: "" },
  onEdit,
}) {
  const $editor = document.createElement("div");
  $page.appendChild($editor);

  let isInit = false;
  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    for (const target of ["title", "content"]) {
      $editor.querySelector(`[name=${target}]`).value =
        this.state[target];
    }
    this.render();
  };

  this.render = () => {
    if (isInit) return;
    $editor.innerHTML = `
      <input type="text" name="title" value="${this.state.title}">
      <textarea name="content">${this.state.content}</textarea>
    `;
    isInit = true;
  };

  this.render();

  $editor.addEventListener("keyup", event => {
    const { target } = event;
    const name = target.getAttribute("name");
    if (this.state[name] === undefined) return;
    this.setState({
      ...this.state,
      [name]: target.value,
    });
    onEdit(this.state);
  });
}

export default Editor;
