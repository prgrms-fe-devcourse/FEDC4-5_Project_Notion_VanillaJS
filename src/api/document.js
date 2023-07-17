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
  return await request(`${PATH.DOCUMENTS}/${documentId}`).catch((err) => {
    throw new Error("현재 존재하지 않는 문서입니다..!");
  });
};

export const putDocument = async ({ documentId, data }) => {
  return await request(`${PATH.DOCUMENTS}/${documentId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }).catch(() => {
    throw new Error("작성 중에 에러가 발생했습니다..!");
  });
};

export const deleteDocument = async (documentId) => {
  return await request(`${PATH.DOCUMENTS}/${documentId}`, {
    method: "DELETE",
  });
};
