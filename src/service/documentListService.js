import { request } from "../api.js";

export const requestCreateDocument = async parent => {
  const newDocument = await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      parent,
      title: "📝 ",
    }),
  });
  return newDocument;
};

export const requestDeleteDocument = async id => {
  await request(`/documents/${id}`, { method: "DELETE" });
};

export const requestGetDocumentList = async () => {
  const documentList = await request("/documents");
  return documentList;
};
