export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  id,
  onEditing,
  onChangeTitle,
}) {
  const $editor = document.createElement("div");
  $editor.setAttribute("id", "editor");

  $editor.innerHTML = `
    <input type="text" name="title" placeholder="제목 없음" id="title"/>
    <textarea name="content" placeholder="내용을 입력하세요" id="content" />
  `;
  $target.appendChild($editor);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.id = id;
  this.setId = (nextId) => (this.id = nextId);

  this.render = () => {
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
  };
  this.render();

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };
    this.setState(nextState);
    onEditing(this.state, this.id);
    onChangeTitle(this.state.title, this.id);
  });

  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    const nextState = {
      ...this.state,
      content: e.target.value,
    };
    this.setState(nextState);
    onEditing(this.state, this.id);
  });
}
