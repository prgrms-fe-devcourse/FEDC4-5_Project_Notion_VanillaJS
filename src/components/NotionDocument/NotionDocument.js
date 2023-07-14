import { DOCUMENT } from '@consts/target';

import Component from '@core/Component';

import DocumentBottomNav from '@components/DocumentBottomNav/DocumentBottomNav';
import NotionEditor from '@components/Editor/NotionEditor';
import Header from '@components/Header/Header';

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
      currentPath: [],
      childPaths: [],
    };
  }

  initComponent() {
    this.$document = document.createElement('div');
    this.$document.className = DOCUMENT.ROOT;

    this.$target.appendChild(this.$document);
  }

  initChildComponents() {
    const { onEdit } = this.props;

    this.$header = new Header(this.$document);

    this.$editorContainer = document.createElement('div');
    this.$editorContainer.className = 'notion-editor-container';

    this.$editor = new NotionEditor(this.$editorContainer, { onEdit });
    this.$document.appendChild(this.$editorContainer);

    this.$bottomNav = new DocumentBottomNav(this.$document);
  }

  setState(nextState) {
    super.setState(nextState);

    const { documentData, currentPath, childPaths } = this.state;

    if (documentData.id === null) return;

    const { id, title, content } = documentData;

    this.$header.setState({ path: currentPath });
    this.$editor.setState({ id, title, content });
    this.$bottomNav.setState({ paths: childPaths });
  }

  render() {
    const { isVisible } = this.state;

    this.$document.style.visibility = isVisible ? 'visible' : 'hidden';
  }
}
