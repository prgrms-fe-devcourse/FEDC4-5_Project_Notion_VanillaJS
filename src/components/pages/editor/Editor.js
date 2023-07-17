export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  onEditing,
}) {
  const $editor = document.createElement('div');
  $editor.className = 'editor';
  $target.appendChild($editor);

  let isInitialize = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    $editor.querySelector('[name=title]').value = this.state.title;
    $editor.querySelector('[name=content]').value = this.state.content;

    this.render();
  };

  this.render = () => {
    if (!isInitialize) {
      $editor.innerHTML = `
        <div class="editor-container">
          <input class="input" type="text" name="title" placeholder="제목 없음" value="${this.state.title}">
          <textarea class="content" name="content" placeholder="내용을 입력해주세요.">${this.state.content}</textarea>
        </div>
      `;

      isInitialize = true;
    }
  };

  this.render();

  $editor.addEventListener('keyup', (e) => {
    const { target } = e;
    const name = target.getAttribute('name');
    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: target.value };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
