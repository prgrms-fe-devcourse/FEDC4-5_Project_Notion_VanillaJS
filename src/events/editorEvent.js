import {
  saveDocumentToServer,
  updateDocumentTree,
  saveDocumentToStorage,
} from "../service/index.js";

let timeout;
export const textareaKeyupEvent = ({ title, content }) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    saveDocumentToStorage({ title, content });
  }, 200);
};

export const titleKeyupEvent = ({ title, content }) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    saveDocumentToStorage({ title, content });
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
  console.log(editor.state);
  editor.state = editor.state.clone({
    content,
  });

  if (editor.state.id !== -1) {
    saveDocumentToServer({ content });
  }
};
