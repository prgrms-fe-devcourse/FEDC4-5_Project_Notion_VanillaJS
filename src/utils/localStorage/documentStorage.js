import { getItem, removeItem, setItem } from './localStorage';

const DOCUMENT_KEY = (id) => `temp-document-${id}`;

const setDocumentItem = (document) => {
  setItem(DOCUMENT_KEY(document.id), {
    ...document,
    tempSaveDate: new Date(),
  });
};

const getDocumentItem = (id) =>
  getItem(DOCUMENT_KEY(id), {
    id: null,
    title: '',
    createdAt: '',
    updatedAt: '',
    content: null,
    documents: [],
  });

const removeDocumentItem = (id) => removeItem(DOCUMENT_KEY(id));

const documentStorage = {
  setDocumentItem,
  getDocumentItem,
  removeDocumentItem,
};

export default documentStorage;
