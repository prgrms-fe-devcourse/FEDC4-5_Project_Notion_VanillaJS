import { saveDocumentToStorage } from "../storage/index.js";
import { saveDocumentToServer } from "../service/index.js";
import { updateDocumentTree } from "../service/index.js";

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

export const titleFocusoutEvent = async ({ documentTree, editor, title }) => {
  const newDocument = editor.state.cloneNewDocument({
    title,
  });
  editor.state = newDocument;
  await saveDocumentToServer({ title: newDocument.title });
  updateDocumentTree({ documentTree });
};

export const textareaFocusoutEvent = async ({ editor, content }) => {
  editor.state = editor.state.cloneNewDocument({
    content,
  });
  if (editor.state.id !== -1) {
    saveDocumentToServer({ content });
  }
};
