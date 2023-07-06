import { findDocumentRoute } from '../../helpers/documentHelper.js';

/**
 * /documents/:documentId 페이지에서 사용되는 데이터를 가져오고 화면을 렌더링합니다.
 */
const renderDocumentPage = async ({ documentPage, documentStore, editorStore }) => {
  const { pathname } = window.location;
  
  let [, , id] = pathname.split('/');
  const documentId = Number(id);

  await loadDocuments({ documentStore });
  await pushAllStorageDocuments({ documentStore, editorStore });
  setOpenedAllParentDocuments({ documentId, documentStore });
  await fetchNewDocument({ documentId, editorStore });

  documentPage.render();
};

export default renderDocumentPage;

// 사이드바에 문서 목록이 없으면 불러오기
const loadDocuments = async ({ documentStore }) => {
  if (documentStore.state.documents.length === 0) await documentStore.fetchDocuments();
};

// 로컬 스토리지에 존재하는 문서가 최신 정보이면 서버에 최신 정보로 반영하기
const pushAllStorageDocuments = async ({ documentStore, editorStore }) => {
  (await editorStore.pushStorageDocuments(documentStore.state.documents)).forEach(({ documentId, document }) => {
    documentStore.updateDocument(documentId, document);
  });
};

// 새로운 문서 페이지를 접속하면 상위 문서를 모두 열림 처리
const setOpenedAllParentDocuments = ({ documentId, documentStore }) => {
  findDocumentRoute(documentId, documentStore.state.documents)
    .filter(({ id }) => id !== documentId)
    .forEach(({ id }) => documentStore.setOpened(id, true));
};

// 새로운 문서 페이지를 접속하면 데이터 가져오기
const fetchNewDocument = async ({ documentId, editorStore }) => {
  if (editorStore.state.documentId !== documentId) {
    try {
      editorStore.setState({ ...editorStore.state, documentId });
      await editorStore.fetchDocument();
    } catch (err) {
      console.error(err);
    }
  }
};
