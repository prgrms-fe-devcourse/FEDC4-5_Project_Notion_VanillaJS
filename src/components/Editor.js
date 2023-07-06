export default class Editor {
  constructor({ $target, initialState }) {
    this.state = initialState;
    this.$target = $target;
    this.$editor = document.createElement('div');
    this.$editor.className = 'editor';
    this.$target.appendChild(this.$editor);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$editor.innerHTML = `
      <input type="text" name="title" placeholder="제목" value="${this.state.title || ''}">
      <textarea name="content" placeholder="내용">${this.state.content || ''}</textarea>
    `;
  }
}