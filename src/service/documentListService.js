import { request } from "../api.js";

export const createDocument = async parent => {
  const newDocument = await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      parent,
      title: "제목을 입력하세요",
    }),
  });
  return newDocument;
};

export const deleteDocument = async id => {
  await request(`/documents/${id}`, { method: "DELETE" });
};

export const getDocumentList = async () => {
  const documentList = await request("/documents");
  return documentList;
};
