import { findDocumentRoute, findDocument } from '../helpers/documentHelper.js';
import {
  createChildDocumentLinks,
  createEditor,
  createNavbar,
  createSidebar,
  createStyleMenu,
} from './constructors/index.js';
import html from './DocumentPage.html';
import './DocumentPage.css';

export default class DocumentPage {
  constructor({ $target, editorStore, documentStore }) {
    this.$target = $target;
    this.$target.innerHTML = html;

    this.editorStore = editorStore;
    this.documentStore = documentStore;

    this.initComponents();
    this.render();
  }

  initComponents() {
    this.sidebar = createSidebar.call(this);
    this.navbar = createNavbar.call(this);
    this.editor = createEditor.call(this);
    this.styleMenu = createStyleMenu.call(this);
    this.childDocumentLinks = createChildDocumentLinks.call(this);
  }

  renderEditor() {
    const { editor, editorStore } = this;

    editor.setState({
      documentId: editorStore.state.documentId,
      document: editorStore.state.document,
    });
  }

  renderSidebar() {
    const { sidebar } = this;
    const { documentStore, editorStore } = this;

    sidebar.setState({
      documents: documentStore.state.documents,
      openedDocuments: documentStore.state.openedDocuments,
      currentDocumentId: editorStore.state.documentId,
    });
  }

  renderNavbar() {
    const { navbar } = this;
    const { editorStore, documentStore } = this;

    navbar.setState({ routes: findDocumentRoute(editorStore.state.documentId, documentStore.state.documents) });
  }

  renderStyleMenu() {
    const { styleMenu } = this;

    styleMenu.setState({ ...styleMenu.state, isShowMenu: false, isShowTextMenu: false });
  }

  renderChildDocumentLinks() {
    const { childDocumentLinks } = this;
    const { documentStore, editorStore } = this;

    childDocumentLinks.setState({
      documents: findDocument(editorStore.state.documentId, documentStore.state.documents)?.documents || [],
    });
  }

  render() {
    this.renderEditor();
    this.renderSidebar();
    this.renderNavbar();
    this.renderStyleMenu();
    this.renderChildDocumentLinks();
  }
}
