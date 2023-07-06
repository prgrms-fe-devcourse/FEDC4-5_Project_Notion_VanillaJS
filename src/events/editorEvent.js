import { saveDocumentToStorage } from "../storage/index.js";

let timeout;
export const textareaKeyupEvent = (content) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    saveDocumentToStorage({ content });
  }, 200);
};

export const titleKeyupEvent = (title) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    saveDocumentToStorage({ title });
  }, 200);
};
