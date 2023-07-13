export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div');
  $editor.classList.add('editor');
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
        <input type="text" name="title" value="${this.state.title}" placeholder="제목 없음"/>
        <textarea name="content" placeholder="내용을 입력해 주세요.">${this.state.content}</textarea>
      `;
      isInitialize = true;
    }
  };

  this.render();

  $editor.addEventListener('keyup', (e) => {
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
