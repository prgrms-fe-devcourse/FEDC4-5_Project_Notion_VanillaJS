export default function DocumentEditor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $editor.innerHTML = `
    <input name="title" type="text" class="document-editor__input" placeholder="제목 없음" value=${this.state.title} />
    <textarea name="content" class="document-editor__textarea" placeholder="내용 없음">${this.state.content}</textarea>
  `;

  $target.appendChild($editor);

  this.render = () => {
    $editor.querySelector("[name='title']").value = this.state.title;
    $editor.querySelector("[name='content']").value = this.state.content;
  };

  $editor.addEventListener("keyup", (e) => {
    const { value, name } = e.target;

    const nextState = {
      ...this.state,
      [name]: value,
    };

    this.setState(nextState);
    onEditing(nextState);
  });
}
