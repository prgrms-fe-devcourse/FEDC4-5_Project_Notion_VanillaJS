/**
 * 특정 document에 도달하기까지 거쳐야 하는 상위 document들의 경로를 반환
 * @typedef {{id: number; title: string; documents: document[]}} document
 * @param {document[]} documents
 * @param {number} documentId
 * @param {{id: number; title: string}[]} path
 * @returns
 */
export function findDocumentPath(documents, documentId, path = []) {
  for (const document of documents) {
    if (document.id === documentId) {
      return [...path, { id: document.id, title: document.title }];
    }
    if (document.documents?.length > 0) {
      const nestedPath = findDocumentPath(document.documents, documentId, [
        ...path,
        { id: document.id, title: document.title },
      ]);
      if (nestedPath) {
        return nestedPath;
      }
    }
  }
  return null;
}
