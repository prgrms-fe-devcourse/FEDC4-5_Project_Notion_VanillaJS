import Component from '@core/Component';

import './NotionEditorTitle.css';

export default class NotionEditorTitle extends Component {
  timer = null;

  setup() {
    this.state = {
      title: '',
    };
  }

  initComponent() {
    this.$titleEditor = document.createElement('div');

    this.$titleEditor.contentEditable = true;
    this.$titleEditor.className = 'notion-editor-title';
    this.$titleEditor.dataset.name = 'title';

    this.$target.appendChild(this.$titleEditor);
  }

  setEvent() {
    const { onEdit, onPressEnterKey } = this.props;

    this.$titleEditor.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
    });

    this.$titleEditor.addEventListener('keypress', (e) => {
      const { key } = e;
      if (key !== 'Enter') return;

      e.preventDefault();
      onPressEnterKey('title');
    });

    this.$titleEditor.addEventListener('input', ({ target }) => {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        onEdit('title', target.innerHTML);
      }, 1000);
    });
  }

  setState(newState) {
    if (newState?.title === this.state?.title) return;
    super.setState(newState);
  }

  render() {
    const { title } = this.state;

    if (title === this.$titleEditor.innerHTML) return;

    this.$titleEditor.innerHTML = title;
  }
}
