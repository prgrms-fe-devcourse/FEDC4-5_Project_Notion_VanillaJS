import { DOCUMENT } from '@consts/target';

import Component from '@core/Component';

import NotionEditor from '@components/Editor/NotionEditor';

import './NotionDocument.css';

export default class NotionDocument extends Component {
  setup() {
    this.state = {
      isVisible: false,
      documentData: {
        id: null,
        title: '',
        createdAt: '',
        updatedAt: '',
        content: null,
        documents: [],
      },
    };
  }

  initComponent() {
    this.$document = document.createElement('div');
    this.$document.className = DOCUMENT.ROOT;

    this.$editorContainer = document.createElement('div');
    this.$editorContainer.className = 'notion-editor-container';

    this.$document.appendChild(this.$editorContainer);
    this.$target.appendChild(this.$document);
  }

  initChildComponents() {
    const { onEdit } = this.props;

    this.$editor = new NotionEditor(this.$editorContainer, { onEdit });
  }

  setState(nextState) {
    super.setState(nextState);

    const { documentData } = this.state;

    if (documentData.id === null) return;

    const { id, title, content } = documentData;
    this.$editor.setState({ id, title, content });
  }

  render() {
    const { isVisible } = this.state;

    this.$document.style.visibility = isVisible ? 'visible' : 'hidden';
  }
}
