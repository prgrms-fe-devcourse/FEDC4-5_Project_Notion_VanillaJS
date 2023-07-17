import { request } from "./api.js";

export const getDocumentWithoutId = async () => {
  return await request("/documents");
};

export const getDocumentWithId = async (id) => {
  return await request(`/documents/${id}`);
};

export const postDocument = async (id) => {
  return await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      title: "문서 제목",
      parent: id,
    }),
  });
};

export const deleteDocument = async (id) => {
  return await request(`/documents/${id}`, {
    method: "DELETE",
  });
};
