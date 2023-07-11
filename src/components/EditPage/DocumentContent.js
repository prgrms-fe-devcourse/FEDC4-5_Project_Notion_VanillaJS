export default class DocumentContent {
  constructor(target, initialState, saveTitle, saveContent) {
    this.$target = target;
    this.state = initialState;
    this.saveTitle = saveTitle;
    this.saveContent = saveContent;
    this.$div = null;
    this.initDiv();
    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  initDiv = () => {
    this.$div = document.createElement('div');
    this.$div.className = 'document-container';
    this.$target.appendChild(this.$div);
    this.addEditEvent();
  };

  render = () => {
    if (this.state === null) {
      return;
    }

    this.$div.innerHTML = `
      <input class='title-area' value='${this.state.title}'>
      <div class='edit-button-container'>
        <button data-command='formatBlock' class='edit-button btn-h1'>h1</button>
        <button data-command='formatBlock' class='edit-button btn-h2'>h2</button>
        <button data-command='formatBlock' class='edit-button btn-h3'>h3</button>
        <button data-command='formatBlock' class='edit-button btn-p'>p</button>
        <button data-command='bold' class='edit-button btn-bold'>B</button>
        <button data-command='italic' class='edit-button btn-italic'>I</button>
        <button data-command='underline' class='edit-button btn-strike'>U</button>
        <button data-command='strikeThrough' class='edit-button btn-ordered'>S</button>
      </div>
      <div contenteditable class='content-container'>
        <span>${this.state.content === null ? '' : this.state.content}</span>
      </div>
    `;
  };

  addEditEvent = () => {
    this.$div.addEventListener('keyup', (event) => this.saveEdit(event.target));
    this.$div.addEventListener('click', (event) => {
      const $button = event.target.closest('button');
      if ($button !== null) {
        this.executeCommand($button);
      }
    });
  };

  executeCommand = ($button) => {
    const $div = this.$div.querySelector('.content-container');
    const { command } = $button.dataset; 
    const args = command === 'formatBlock' ? $button.innerText : null;

    document.execCommand(command, false, args);
    $div.focus({ preventScroll: true });
    this.saveEdit($div);
  };

  saveEdit = (target) => {
    const $input = this.$div.querySelector('input');
    const $div = this.$div.querySelector('.content-container');
    const editedDocument = {
      title: $input.value,
      content: $div.innerHTML,
    };

    target === $input
    ? this.saveTitle(editedDocument)
    : this.saveContent(editedDocument);
  };
}
