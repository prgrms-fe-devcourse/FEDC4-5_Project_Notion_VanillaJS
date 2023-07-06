let currentDocumentId = null;

export const getCurrentDocumentId = () => currentDocumentId;

export const setCurrentDocumentId = (documentId) => {
  currentDocumentId = documentId;
};
