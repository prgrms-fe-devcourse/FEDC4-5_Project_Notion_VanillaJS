export default class Editor{
  constructor ({ $target, initialState }) {
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
    <input type='text' name='title' placeholder="제목"/>
    <textarea name='content' placeholder='내용'></textarea>
    `

    this.$editor.querySelector('[name=title]').value = this.state.title;
    this.$editor.querySelector('[name=content]').value = this.state.content;
  }
}