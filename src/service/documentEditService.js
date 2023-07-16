import { request } from "../api.js";
import { getDocumentStorageById } from "../storage.js";

export const saveDocumentStorage = (id, document) => {
  const documentStorage = getDocumentStorageById(id);
  documentStorage.setItem({
    ...document,
    date: new Date(),
  });
};

export const clearDocumentStorage = id => {
  const documentStorage = getDocumentStorageById(id);
  documentStorage.removeItem();
};

export const requestGetDocument = async id => {
  const selectedDocument = await request(
    `/documents/${id}`
  );
  const documentStorage = getDocumentStorageById(id);
  const storedDocument = documentStorage.getItem();
  if (
    storedDocument.date &&
    storedDocument.date > selectedDocument.update_at
  ) {
    if (confirm("저장 중인 글이 있습니다. 불러올까요?")) {
      return storedDocument;
    }
  }
  return selectedDocument;
};

export const requestEditDocument = async (id, document) => {
  await request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: document.title,
      content: document.content,
    }),
  });
};
