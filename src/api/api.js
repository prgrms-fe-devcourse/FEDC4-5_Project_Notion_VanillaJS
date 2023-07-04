import { request } from "./index.js";

const fetchMethodType = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const getRootDocuments = async () => {
  return await request("/documents");
};

const getDocument = async (documentId) => {
  return await request(`/documents/${documentId}`);
};

const createDocument = async (documentData) => {
  return await request("/documents", {
    method: fetchMethodType.POST,
    body: JSON.stringify(documentData),
  });
};

const modifyDocument = async (documentId, documentData) => {
  return await request(`/documents/${documentId}`, {
    method: fetchMethodType.PUT,
    body: JSON.stringify(documentData),
  });
};

const deleteDocument = async (documentId) => {
  return await request(`/documents/${documentId}`, {
    method: fetchMethodType.DELETE,
  });
};

export {
  getRootDocuments,
  getDocument,
  createDocument,
  modifyDocument,
  deleteDocument,
};
