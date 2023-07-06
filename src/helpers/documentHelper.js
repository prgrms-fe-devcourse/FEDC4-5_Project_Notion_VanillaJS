/**
 * 특정 문서까지 도달하기 위해 거쳐야 할 문서들의 경로를 반환합니다.
 * @param {number} documentId 찾으려는 문서의 ID
 * @param {array} documents 찾으려는 문서가 존재하는 문서들의 배열로, 기본값은 전체 문서 목록입니다.
 * @returns
 */
export const findDocumentRoute = (documentId, documents = []) => {
  for (const currentDocument of documents) {
    if (currentDocument.id === documentId) return [currentDocument];
    if (currentDocument.documents.length > 0) {
      const routes = findDocumentRoute(documentId, currentDocument.documents);
      if (routes.length > 0) return [currentDocument, ...routes];
    }
  }

  return [];
};

/**
 * 문서 목록에서 특정 문서의 내용을 수정한 결과 목록을 반환합니다.
 * @param {number} documentId 수정할 문서의 ID
 * @param {object} newDocument 새로운 문서의 내용
 * @param {array} documents 문서 목록
 * @returns
 */
export const findModifiedDocuments = (documentId, newDocument, documents) => {
  return documents.map((currentDocument) => {
    if (currentDocument.id === documentId) return { ...currentDocument, ...newDocument };
    if (currentDocument.documents.length > 0)
      return {
        ...currentDocument,
        documents: findModifiedDocuments(documentId, newDocument, currentDocument.documents),
      };

    return currentDocument;
  });
};

/**
 * 문서 목록에서 특정 문서를 찾아 반환합니다.
 * @param {number} documentId 찾을 문서의 ID
 * @param {array} documents 문서 목록
 */
export const findDocument = (documentId, documents = []) => {
  for (const currentDocument of documents) {
    if (currentDocument.id === documentId) return currentDocument;
    if (currentDocument.documents.length > 0) {
      const document = findDocument(documentId, currentDocument.documents);
      if (document) return document;
    }
  }

  return null;
};
