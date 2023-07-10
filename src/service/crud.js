import { request } from "./api.js";

export const getDocument = async (id) => {
  return await request(`/documents/${id}`, {
    method: "GET",
  });
};

export const createDocument = async (document) => {
  return await request(`/documents`, {
    method: "POST",
    body: JSON.stringify(document),
  });
};

export const updateDocument = async (id, document) => {
  return await request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify(document),
  });
};

export const deleteDocument = async (id) => {
  await request(`/documents/${id}`, {
    method: "DELETE",
  });
};
