import { request } from "../api.js";

export const createDocument = async parent => {
  const newDocument = await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      parent,
      title: "📝 ",
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
