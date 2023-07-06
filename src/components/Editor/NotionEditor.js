import Component from '@core/Component';

import NotionEditorTitle from '@components//Editor/Title/NotionEditorTitle';
import NotionEditorContent from '@components/Editor/Content/NotionEditorContent';

import './NotionEditor.css';

export default class NotionEditor extends Component {
  initComponent() {
    this.$editor = document.createElement('section');
    this.$editor.className = 'notion-editor';
    this.$target.appendChild(this.$editor);
  }

  initChildComponents() {
    this.$title = new NotionEditorTitle(this.$editor, {
      onEdit: this.handleEditorInputChange.bind(this),
      onPressEnterKey: this.handlePressEnterKey.bind(this),
    });
    this.$content = new NotionEditorContent(this.$editor, {
      onEdit: this.handleEditorInputChange.bind(this),
    });
  }

  handleEditorInputChange(name, value) {
    const { onEdit } = this.props;

    onEdit(name, {
      ...this.state,
      [name]: value,
    });
  }

  handlePressEnterKey(name) {
    if (name === 'title') {
      const $contentEditor = this.$target.querySelector(
        '.notion-editor-content'
      );
      $contentEditor.focus();
    }
  }

  setState(newstate) {
    super.setState(newstate);

    const { title, content } = this.state;
    this.$title.setState({ title });
    this.$content.setState({ content });
  }
}
