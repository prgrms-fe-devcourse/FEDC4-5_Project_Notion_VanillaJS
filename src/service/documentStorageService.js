import { getItem, setItem, removeItem } from "../storage/storage.js";
import { getDocumentIdByPathname } from "./index.js";

export const saveDocumentToStorage = ({ title, content }) => {
  setItem("documents/" + getDocumentIdByPathname(), {
    title,
    content,
    tmpSaveDate: new Date(),
  });
};

export const removeDocumentFromStorage = (documentId) => {
  removeItem("documents/" + documentId);
};

export const getDocumentFromStorage = (documentId) => {
  return getItem("documents/" + documentId, []);
};
