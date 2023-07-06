import DocumentPage from './pages/DocumentPage.js';
import DocumentStore from './stores/documentStore.js';
import EditorStore, { initialDocument } from './stores/editorStore.js';
import storage from './utils/storage.js';
import renderPage from './routers/render.js';
import { initRouteEvents } from './routers/utils.js';
import { OPENED_DOCUMENTS } from './constants/storageKeys.js';

export default class App {
  constructor({ $target }) {
    this.$target = $target;

    this.initStores();
    this.initComponents();
    this.initEvents();
    this.route();
  }

  initStores() {
    this.editorStore = new EditorStore({
      initialState: {
        documentId: 0,
        document: initialDocument,
      },
    });

    this.documentStore = new DocumentStore({
      initialState: {
        openedDocuments: storage.getItem(OPENED_DOCUMENTS, {}),
        documents: [],
      },
    });
  }

  initComponents() {
    this.documentPage = new DocumentPage({
      $target: this.$target,
      documentStore: this.documentStore,
      editorStore: this.editorStore,
    });
  }

  initEvents() {
    initRouteEvents(() => this.route());
  }

  route() {
    const { documentPage, documentStore, editorStore } = this;
    renderPage({ documentPage, documentStore, editorStore });
  }
}
