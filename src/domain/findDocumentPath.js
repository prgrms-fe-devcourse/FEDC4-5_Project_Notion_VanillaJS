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
