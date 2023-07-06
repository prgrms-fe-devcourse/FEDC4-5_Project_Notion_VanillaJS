const storage = window.localStorage;

const getOpenDocumentIds = (openDocuments, documents) => {
  if (!Array.isArray(openDocuments)) {
    return null;
  }

  return documents.map((doc) => {
    const documentInfo = { ...doc, isOpen: openDocuments.includes(doc.id) };

    if (Array.isArray(doc.documents) && doc.documents.length > 0) {
      documentInfo.documents = getOpenDocumentIds(openDocuments, doc.documents);
    }

    return documentInfo;
  });
};
export const getDocuments = (key, documents) => {
  try {
    const openDocuments = JSON.parse(storage.getItem(key));
    return getOpenDocumentIds(openDocuments, documents) || documents;
  } catch (e) {
    return documents;
  }
};

const setOpenDocumentIds = (documents) =>
  documents.reduce((acc, doc) => {
    let currentDocs = [...acc];
    if (doc.isOpen) {
      currentDocs.push(doc.id);
    }

    if (Array.isArray(doc.documents) && doc.documents.length > 0) {
      currentDocs = currentDocs.concat(setOpenDocumentIds(doc.documents));
    }

    return currentDocs;
  }, []);

export const setDocuments = (key, documents) => {
  storage.setItem(key, JSON.stringify(setOpenDocumentIds(documents)));
};
