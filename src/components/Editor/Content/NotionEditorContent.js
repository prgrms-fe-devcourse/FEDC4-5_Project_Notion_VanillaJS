import Editor from '@utils/editor';
import { getKoreanRegex } from '@utils/regex';

import Component from '@core/Component';

import './NotionEditorContent.css';

export default class NotionEditorContent extends Component {
  timer = null;

  setup() {
    this.state = {
      content: '',
    };
  }

  initComponent() {
    this.$contentEditor = document.createElement('div');

    this.$contentEditor.contentEditable = true;
    this.$contentEditor.className = 'notion-editor-content';
    this.$contentEditor.dataset.name = 'content';

    this.$target.appendChild(this.$contentEditor);
  }

  handleEdit({ target, callback }) {
    Editor.saveCaretPosition();

    const html = target.innerHTML;
    const string = Editor.stringify(html);

    callback('content', string);
  }

  setEvent() {
    const { onEdit } = this.props;

    this.$contentEditor.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
    });

    this.$contentEditor.addEventListener(
      'compositionupdate',
      ({ target, isTrusted }) => {
        if (isTrusted === false) return;

        if (this.timer !== null) clearTimeout(this.timer);

        this.timer = setTimeout(async () => {
          this.$contentEditor.blur();
          this.$contentEditor.focus();
          this.handleEdit({ target, callback: onEdit });
        }, 1000);
      }
    );

    this.$contentEditor.addEventListener(
      'compositionend',
      ({ target, isTrusted }) => {
        if (isTrusted === false) return;

        if (this.timer !== null) clearTimeout(this.timer);

        this.timer = setTimeout(async () => {
          this.$contentEditor.blur();
          this.$contentEditor.focus();
          this.handleEdit({ target, callback: onEdit });
        }, 1000);
      }
    );

    this.$contentEditor.addEventListener(
      'input',
      ({ target, isTrusted, isComposing, data }) => {
        if (isTrusted === false) return;

        if (isComposing) return;

        const koreanRegex = getKoreanRegex();
        const isKorean = koreanRegex.exec(data) !== null;

        if (isKorean) {
          this.$contentEditor.blur();
          const { content } = this.state;
          this.setState({ content });
          this.$contentEditor.focus();

          return;
        }

        if (this.timer !== null) clearTimeout(this.timer);

        this.timer = setTimeout(async () => {
          this.handleEdit({ target, callback: onEdit });
        }, 1000);
      }
    );
  }

  setState(newState) {
    if (newState?.content === this.state?.content) return;
    super.setState(newState);
  }

  render() {
    const { content } = this.state;

    this.$contentEditor.innerHTML = Editor.parse(content);

    Editor.restoreCaretPosition();
  }
}
