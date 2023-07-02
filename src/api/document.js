import { PATH } from "../constants/path.js";
import { request } from "./request.js";

export const postDocument = async (data) => {
  return await request(PATH.DOCUMENTS, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getDocuments = async () => {
  return await request(PATH.DOCUMENTS);
};

export const getDocument = async (documentId) => {
  return await request(`${PATH.DOCUMENTS}/${documentId}`);
};

export const putDocument = async ({ documentId, data }) => {
  return await request(`${PATH.DOCUMENTS}/${documentId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteDocument = async (documentId) => {
  return await request(`${PATH.DOCUMENTS}/${documentId}`, {
    method: "DELETE",
  });
};
