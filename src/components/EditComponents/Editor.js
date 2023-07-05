export default function Editor({
  $target,
  initalState = { title: "Untitle", content: "" },
  onEdit,
}) {
  if (!new.target)
    new Editor({
      $target,
      initalState,
      onEdit,
    });

  const $editor = document.createElement("div");
  $target.appendChild($editor);

  this.state = initalState;

  let isInit = false;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInit) {
      $editor.innerHTML = `
        <input type="text" name="title" value="${this.state.title}" placeholder="제목을 입력하시오!" autofocus/>
        <textarea name="content">${this.state.content}</textarea>
      `;
      isInit = true;
    }
  };

  $editor.addEventListener("keyup", (event) => {
    const { name, value } = event.target;
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: value,
      };
      this.setState(nextState);
      onEdit(nextState);
    }
  });

  this.render();
}
