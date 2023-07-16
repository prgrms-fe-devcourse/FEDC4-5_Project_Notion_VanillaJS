import storage from '../utils/storage.js';
import { OPENED_DOCUMENTS } from '../constants/storageKeys.js';
import { findModifiedDocuments } from '../helpers/documentHelper.js';
import { getDocuments } from '../apis/api.js';

/**
 * 문서 목록을 보관하고 관리하는 클래스입니다.
 */
export default class DocumentStore {
  constructor({
    initialState = {
      openedDocuments: {},
      documents: [],
    },
  }) {
    this.state = initialState;
  }

  setState(nextState) {
    this.state = nextState;
  }

  /**
   * 원격 서버에서 문서 목록을 가져와 상태에 보관합니다.
   */
  async fetchDocuments() {
    const documents = await getDocuments();
    this.setState({
      ...this.state,
      documents: documents || [],
    });
  }

  /**
   * 특정 문서의 하위 문서를 열림/닫힘 처리 합니다.
   * @param {number} documentId 조작할 문서의 ID
   * @param {boolean} opened 하위 문서 열림 여부
   */
  setOpened(documentId, opened) {
    const openedDocuments = { ...this.state.openedDocuments };
    if (opened) openedDocuments[documentId] = true;
    else delete openedDocuments[documentId];

    this.setState({ ...this.state, openedDocuments });
    storage.setItem(OPENED_DOCUMENTS, openedDocuments);
  }

  /**
   * 상태에 저장된 문서 목록에서 특정 문서의 내용을 수정합니다.
   * @param {number} documentId 수정할 문서의 ID
   * @param {object} newDocument 문서의 내용
   */
  updateDocument(documentId, newDocument) {
    const newDocuments = findModifiedDocuments(documentId, newDocument, this.state.documents);
    this.setState({ ...this.state, documents: newDocuments });
  }
}
