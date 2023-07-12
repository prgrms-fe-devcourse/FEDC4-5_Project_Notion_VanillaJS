import { getItem, setItem, removeItem } from "../storage/storage.js";
import { hashRouter } from "../router/hashRouter.js";
import { DOCUMENT_KEY } from "../constant/apiKey.js";

export const saveDocumentToStorage = ({ title, content }) => {
  setItem(DOCUMENT_KEY + hashRouter.url, {
    title,
    content,
    tmpSaveDate: new Date().toString(),
  });
};

export const removeDocumentFromStorage = (documentId) => {
  removeItem(DOCUMENT_KEY + documentId);
};

export const getDocumentFromStorage = (documentId) => {
  return getItem(DOCUMENT_KEY + documentId, {});
};
