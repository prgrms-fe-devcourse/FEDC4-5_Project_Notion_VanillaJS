import {
  saveDocumentToServer,
  updateDocumentTree,
  saveDocumentToStorage,
  cloneDomain,
} from "../service/index.js";

let timeout;

export const textareaFocusoutEvent = async ({ editor, content }) => {
  editor.state = cloneDomain({
    domain: editor.state,
    newPropertie: { content },
  });

  if (editor.state.id !== -1) {
    saveDocumentToServer({ content });
  }
};

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
  editor.state = cloneDomain({ domain: editor.state, newPropertie: { title } });
  await saveDocumentToServer({ title: editor.state.title });
  updateDocumentTree({ documentTree });
};
