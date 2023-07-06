import {
  createChildDocumentLinks,
  createEditor,
  createNavbar,
  createSidebar,
  createStyleMenu,
} from './constructors/index.js';
import {
  renderChildDocumentLinks,
  renderEditor,
  renderNavbar,
  renderSidebar,
  renderStyleMenu,
} from './renders/index.js';
import html from './DocumentPage.html';
import './DocumentPage.css';

export default class DocumentPage {
  constructor({ $target, editorStore, documentStore }) {
    this.$target = $target;
    this.$target.innerHTML = html;

    this.editorStore = editorStore;
    this.documentStore = documentStore;

    this.initComponents();
    this.initRenders();
    this.render();
  }

  initComponents() {
    this.sidebar = createSidebar.call(this);
    this.navbar = createNavbar.call(this);
    this.editor = createEditor.call(this);
    this.styleMenu = createStyleMenu.call(this);
    this.childDocumentLinks = createChildDocumentLinks.call(this);
  }

  initRenders() {
    this.renderEditor = renderEditor.bind(this);
    this.renderSidebar = renderSidebar.bind(this);
    this.renderNavbar = renderNavbar.bind(this);
    this.renderStyleMenu = renderStyleMenu.bind(this);
    this.renderChildDocumentLinks = renderChildDocumentLinks.bind(this);
  }

  render() {
    this.renderEditor();
    this.renderSidebar();
    this.renderNavbar();
    this.renderStyleMenu();
    this.renderChildDocumentLinks();
  }
}
