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
    this.$titleEditor = document.createElement('textarea');

    this.$titleEditor.className = 'notion-editor-title';
    this.$titleEditor.dataset.name = 'title';
    this.$titleEditor.placeholder = 'Untitled';

    this.$target.appendChild(this.$titleEditor);
  }

  setEvent() {
    const { onEdit, onPressEnterKey } = this.props;

    this.$titleEditor.addEventListener('keypress', (e) => {
      const { key } = e;
      if (key !== 'Enter') return;

      e.preventDefault();
      onPressEnterKey('title');
    });

    this.$titleEditor.addEventListener('input', ({ target }) => {
      this.$titleEditor.style.height = `${this.$titleEditor.scrollHeight}px`;

      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        onEdit('title', target.value);
      }, 1000);
    });
  }

  setState(newState) {
    if (newState?.title === this.state?.title) return;
    super.setState(newState);
  }

  render() {
    const { title } = this.state;

    this.$titleEditor.value = title ?? '';
    this.$titleEditor.style.height = `${40 + this.$titleEditor.scrollHeight}px`;
  }
}
