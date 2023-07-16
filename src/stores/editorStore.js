import storage from '../utils/storage.js';
import { debounce } from '../utils/debounce.js';
import { DOCUMENT } from '../constants/storageKeys.js';
import { findDocument } from '../helpers/documentHelper.js';
import { getDocument, modifyDocument } from '../apis/api.js';

export const initialDocument = {
  title: '',
  content: '',
  updatedAt: '1970-01-01T09:00:00.000Z',
};

/**
 * 에디터의 상태를 보관하고 관리하는 클래스입니다.
 */
export default class EditorStore {
  constructor({
    initialState = {
      documentId: 0,
      document: initialDocument,
    },
  }) {
    this.state = initialState;
  }

  setState(nextState) {
    this.state = nextState;
  }

  /**
   * 원격 서버와 로컬 스토리지에서 문서 정보를 가져오고, 더 최근에 작성된 문서 정보를 상태에 보관하고 반환합니다.
   */
  async fetchDocument() {
    const { documentId } = this.state;

    const remoteDocument = await getDocument(documentId);
    if (!remoteDocument) throw new Error('존재하지 않는 문서입니다.');
    const localDocument = storage.getItem(DOCUMENT(documentId), initialDocument);
    const recentDocument = remoteDocument.updatedAt < localDocument.updatedAt ? localDocument : remoteDocument;

    this.setState({ ...this.state, document: recentDocument });
    return { document: recentDocument, documentId };
  }

  /**
   * 스토어의 상태에 저장된 문서 정보를 로컬 스토리지에 저장하고, 서버에 디바운스로 업데이트 요청을 합니다.
   * @param {function} onSuccess 문서 저장 성공 시 실행할 콜백 함수
   * @param {number} timeout 디바운스 시간
   */
  saveDocument(onSuccess = () => {}, timeout = 1000) {
    const { documentId, document } = this.state;
    const { title, content } = document;
    if (title === '' && content === '') return;

    storage.setItem(DOCUMENT(documentId), {
      ...document,
      updatedAt: new Date(),
    });

    debounce(async () => {
      await modifyDocument(document, documentId);
      storage.removeItem(DOCUMENT(documentId));
      onSuccess();
    }, timeout);
  }

  /**
   * 로컬 스토리지에 존재하는 모든 데이터를 읽고, 서버에서 가져온 문서보다 최신 정보인 경우에 서버에 업데이트 요청을 합니다.
   * @param {array} documents 서버에서 가져온 문서 목록
   */
  pushStorageDocuments(documents = []) {
    const promises = Object.keys(localStorage)
      .filter((key) => key.startsWith(DOCUMENT()))
      .map((key) => {
        const documentId = Number(key.split('_')[1]);
        const remoteDocument = findDocument(documentId, documents);
        const localDocument = JSON.parse(localStorage.getItem(key));

        return remoteDocument && remoteDocument.updatedAt < localDocument.updatedAt
          ? { key, documentId, localDocument }
          : null;
      })
      .filter((item) => item !== null)
      .map((item) => {
        const { key, documentId, localDocument } = item;

        return new Promise(async (resolve) => {
          await modifyDocument(localDocument, documentId);
          localStorage.removeItem(key);
          resolve({ documentId, document: localDocument });
        });
      });

    return Promise.all(promises);
  }
}
