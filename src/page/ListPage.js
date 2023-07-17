import { getRootAPI, createAPI, removeAPI } from '../utils/API.js';
import DocumentList from '../components/ListPage/DocumentList.js';
import RootCreateButton from '../components/ListPage/RootCreateButton.js';

export default class ListPage {
  constructor($target, initialState, selectDocument) {
    this.$target = $target;
    this.state = initialState;
    this.selectDocument = selectDocument;
    this.$div = null;
    this.fetchRootDocument();
    this.initDiv();
    this.render();
  }

  setRootDocument = (nextState) => {
    this.state = nextState;
    this.render();
  };

  fetchRootDocument = async () => {
    const rootDocument = await getRootAPI();
    const nextState = {
      rootDocument,
    };
    this.setRootDocument(nextState);
  };

  initDiv = () => {
    this.$div = document.createElement('div');
    this.$div.className = 'list-page-container';
    this.$target.appendChild(this.$div);
  };

  createDocument = async (documentId = null) => {
    const documentInfo = {
      title: '제목 없음',
      parent: documentId,
    };
    const newDocument = await createAPI(documentInfo);
    this.fetchRootDocument();
    this.selectDocument(newDocument.id);
  };

  removeDocument = async (documentId) => {
    await removeAPI(`/documents/${documentId}`);
    const { pathname } = location;

    this.fetchRootDocument();

    if (pathname === `/documents/${documentId}`) {
      this.selectDocument(null);
    }
  };

  render = () => {
    const { rootDocument } = this.state;

    if (rootDocument === null) {
      return;
    }
    this.$div.innerHTML = ``;
    rootDocument.forEach((documentInfo) => {
      const state = {
        documentInfo: documentInfo,
        depth: 0,
      };
      new DocumentList(
        this.$div,
        state,
        this.selectDocument,
        this.createDocument,
        this.removeDocument,
      );
    });
    new RootCreateButton(this.$div, this.createDocument);
  };
}
