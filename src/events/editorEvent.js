import {
  saveDocumentToServer,
  updateDocumentTree,
  saveDocumentToStorage,
} from "../service/index.js";
import { Document } from "../domain/index.js";

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
  editor.state = editor.state.clone({
    title,
  });

  await saveDocumentToServer({ title: editor.state.title });
  updateDocumentTree({ documentTree });
};

export const textareaFocusoutEvent = async ({ editor, content }) => {
  editor.state = editor.state.clone({
    content,
  });

  if (editor.state.id !== -1) {
    saveDocumentToServer({ content });
  }
};
