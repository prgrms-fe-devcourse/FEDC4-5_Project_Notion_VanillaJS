import DocumentPage from './pages/DocumentPage.js';
import DocumentStore from './stores/documentStore.js';
import EditorStore from './stores/editorStore.js';
import storage from './utils/storage.js';
import { findDocumentRoute } from './helpers/documentHelper.js';
import { OPENED_DOCUMENTS } from './constants/storageKeys.js';
import { navigate } from './utils/navigate.js';
import { initialDocument } from './stores/editorStore.js';
import { NAVIGATE_EVENT_KEY } from './utils/navigate.js';

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
    window.addEventListener(NAVIGATE_EVENT_KEY, (e) => {
      const { nextUrl } = e.detail;
      if (!nextUrl) return;

      if (window.location.pathname === nextUrl) history.replaceState(null, null, nextUrl);
      else history.pushState(null, null, nextUrl);
      this.route();
    });

    window.addEventListener('popstate', (e) => {
      this.route();
    });

    window.addEventListener('click', (e) => {
      const $link = e.target.closest('a');
      if (!$link) return;

      e.preventDefault();
      navigate($link.getAttribute('href'));
    });
  }

  async route() {
    const { pathname } = window.location;
    const { documentStore, editorStore } = this;

    // 사이드바에 문서 목록이 없으면 불러오기
    if (documentStore.state.documents.length === 0) await documentStore.fetchDocuments();

    // 로컬 스토리지에 존재하는 문서가 최신 정보이면 서버에 최신 정보로 반영하기
    (await editorStore.pushStorageDocuments(documentStore.state.documents)).forEach(({ documentId, document }) => {
      documentStore.updateDocument(documentId, document);
    });

    if (pathname === '/') {
    } else if (pathname.indexOf('/documents/') === 0) {
      let [, , id] = pathname.split('/');
      const documentId = Number(id);

      // 새로운 문서 페이지를 접속하면 상위 문서를 모두 열림 처리
      findDocumentRoute(documentId, documentStore.state.documents)
        .filter(({ id }) => id !== documentId)
        .forEach(({ id }) => documentStore.setOpened(id, true));

      // 새로운 문서 페이지를 접속하면 데이터 가져오기
      if (editorStore.state.documentId !== documentId) {
        try {
          await editorStore.fetchDocument(documentId);
          editorStore.setState({ ...editorStore.state, documentId });
        } catch (err) {
          console.error(err);
        }
      }
    }
    this.documentPage.render();
  }
}
