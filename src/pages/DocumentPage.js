import { navigate } from '../utils/navigate.js';
import { addDocument, removeDocument } from '../apis/api.js';
import { findDocumentRoute, findDocument } from '../helpers/documentHelper.js';
import Sidebar from '../components/Sidebar/Sidebar.js';
import Navbar from '../components/Navbar/Navbar.js';
import Editor from '../components/Editor/Editor.js';
import StyleMenu from '../components/StyleMenu/StyleMenu.js';
import ChildDocumentLinks from '../components/ChildDocumentLinks/ChildDocumentLinks.js';
import html from './DocumentPage.html';
import './DocumentPage.css';

const selection = window.getSelection();

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
    const { $target, documentStore, editorStore } = this;

    this.sidebar = new Sidebar({
      $target: $target.querySelector('.sidebar'),
      initialState: {
        documents: documentStore.state.documents,
        openedDocuments: documentStore.state.openedDocuments,
        currentDocumentId: editorStore.state.documentId,
      },
      onAppend: async (id) => {
        this.documentStore.setOpened(id, true);

        const newDocument = await addDocument('', id);
        await documentStore.fetchDocuments();

        navigate(`/documents/${newDocument.id}`);
        this.render();
      },
      onRemove: async (id) => {
        await removeDocument(id);
        await documentStore.fetchDocuments();
        editorStore.setState({ ...editorStore.state, documentId: 0 });
        this.render();
      },
      onNavigate: (id) => navigate(`/documents/${id}`),
      onToggleOpened: (id) => {
        this.documentStore.setOpened(id, !this.documentStore.state.openedDocuments[id]);
        this.render();
      },
    });

    this.navbar = new Navbar({
      $target: $target.querySelector('.main__navbar'),
    });

    this.editor = new Editor({
      $target: $target.querySelector('.main__editor'),
      initialState: editorStore.state.document,
      onChange: ({ name, value }) => {
        const newDocument = {
          ...editorStore.state.document,
          [name]: value,
          updateAt: new Date(),
        };

        editorStore.setState({ ...editorStore.state, document: newDocument });
        editorStore.saveDocument();
        documentStore.updateDocument(editorStore.state.documentId, newDocument);

        this.renderSidebar();
        this.renderNavbar();
      },
      onOpenStyleMenu: (e) => {
        setTimeout(() => {
          if (selection.toString().trim().length > 0) {
            this.styleMenu.setState({
              ...this.styleMenu.state,
              pageX: e.pageX,
              pageY: e.pageY,
              isShowMenu: true,
              isShowTextMenu: false,
            });
          }
        }, 0);
      },
      onCloseStyleMenu: (e) => {
        this.styleMenu.setState({
          ...this.styleMenu.state,
          isShowMenu: false,
          isShowTextMenu: false,
        });
      },
    });

    this.styleMenu = new StyleMenu({
      $menu: document.querySelector('.style-menu'),
      $textMenu: document.querySelector('.text-style-menu'),
    });

    this.childDocumentLinks = new ChildDocumentLinks({
      $target: $target.querySelector('.main__child-document-links'),
      initialState: {
        documents: findDocument(editorStore.state.documentId, documentStore.state.documents)?.documents || [],
      },
    });
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
