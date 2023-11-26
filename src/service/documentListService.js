import { request } from "../api.js";

export const requestCreateDocument = async parent => {
  return await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      parent,
      title: "📝 ",
    }),
  });
};

export const requestDeleteDocument = async id => {
  await request(`/documents/${id}`, { method: "DELETE" });
};

export const requestGetDocumentList = async () => {
  return await request("/documents");
};
