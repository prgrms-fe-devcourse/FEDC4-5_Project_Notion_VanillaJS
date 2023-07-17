const storage = window.localStorage;

const getToggledDocumentsIds = (openDocuments, documents) => {
  if (!Array.isArray(openDocuments)) {
    return null;
  }

  return documents.map((doc) => {
    const documentInfo = { ...doc, isOpen: openDocuments.includes(doc.id) };

    if (Array.isArray(doc.documents) && doc.documents.length > 0) {
      documentInfo.documents = getToggledDocumentsIds(openDocuments, doc.documents);
    }

    return documentInfo;
  });
};
export const getToggledDocuments = (key, documents) => {
  try {
    const openDocuments = JSON.parse(storage.getItem(key));
    return getToggledDocumentsIds(openDocuments, documents) || documents;
  } catch (e) {
    return documents;
  }
};

const setToggledDocumentsIds = (documents) =>
  documents.reduce((acc, doc) => {
    let currentDocs = [...acc];
    if (doc.isOpen) {
      currentDocs.push(doc.id);
    }

    if (Array.isArray(doc.documents) && doc.documents.length > 0) {
      currentDocs = currentDocs.concat(setToggledDocumentsIds(doc.documents));
    }

    return currentDocs;
  }, []);

export const setToggledDocuments = (key, documents) => {
  storage.setItem(key, JSON.stringify(setToggledDocumentsIds(documents)));
};
