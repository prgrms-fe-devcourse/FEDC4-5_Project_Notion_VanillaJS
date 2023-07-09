export default function Editor({
  target,
  initialState = {
    title: '',
    content: '',
  },
  onEditing,
}) {
  const editor = document.createElement('div');

  let isInit = false;
  this.state = initialState;
  target.appendChild(editor);

  this.setState = (nextState) => {
    this.state = nextState;
    editor.querySelector('[name=title]').value = this.state.title;
    editor.querySelector('[name=content]').value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInit) {
      editor.innerHTML = `
      <input type="text" name="title" style="width: 300px;" value="${this.state.title}"/>
      <textarea name="content" style="width: 300px; height: 300px;">${this.state.content}</textarea>
    `;
      isInit = true;
    }
  };

  this.render();

  editor.addEventListener('keyup', (e) => {
    // 이벤트 버블링 이용
    const { target } = e;

    const name = target.getAttribute('name');
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
