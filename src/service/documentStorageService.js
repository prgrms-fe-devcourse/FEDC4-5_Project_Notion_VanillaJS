import { getItem, setItem, removeItem } from "../storage/storage.js";
import { hashRouter } from "../router/hashRouter.js";

export const saveDocumentToStorage = ({ title, content }) => {
  setItem("documents/" + hashRouter.url, {
    title,
    content,
    tmpSaveDate: new Date(),
  });
};

export const removeDocumentFromStorage = (documentId) => {
  removeItem("documents/" + documentId);
};

export const getDocumentFromStorage = (documentId) => {
  return getItem("documents/" + documentId, {});
};
