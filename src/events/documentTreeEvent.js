import {
  updateDocumentTree,
  removeDocumentFromStorage,
} from "../service/index.js";
import { hashRouter } from "../router/hashRouter.js";
import { Document } from "../domain/index.js";
import { request } from "../api.js";
import { initDocument } from "../constant/constants.js";

export const documentLinkClickEvent = async ({ url, event }) => {
  event.preventDefault();
  hashRouter.push(url);
};

export const addDocumentButtonClickEvent = async ({
  event,
  target,
  documentTree,
}) => {
  if (!documentTree.state.isInput) {
    documentTree.state.isInput = true;
    const $input = document.createElement("input");
    $input.placeholder = "제목";
    $input.className = "documentInput";
    $input.maxLength = 20;

    const $deleteInputButton = document.createElement("button");
    $deleteInputButton.className = "deleteInputButton";
    if (target === null) {
      event.target.parentNode.insertBefore($input, event.target);
      return;
    }

    target.appendChild($deleteInputButton);
    target.appendChild($input);
  }
};

export const deleteDocumentButtonClickEvent = async ({
  documentTree,
  editor,
  target,
}) => {
  const { id } = target;
  await request(`/documents/${id}`, {
    method: "DELETE",
  }).then((res) => {
    removeDocumentFromStorage(res.id);
    history.pushState(null, null, "/");
  });
  updateDocumentTree({ documentTree });
  editor.state = new Document(initDocument);
};

export const documentInputChangeEvent = async ({
  event,
  documentTree,
  target,
}) => {
  const { value } = event.target;
  await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      title: value,
      parent: target ? target.id : null,
    }),
  });
  updateDocumentTree({ documentTree });
  documentTree.state.isInput = false;
};
