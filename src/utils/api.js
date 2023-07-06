import { API_END_POINT, X_USERNAME } from "../constant/constant.js";
import { hideLoading, showLoading } from "./loadingHandler.js";

const request = async (url, opitons = {}) => {
  showLoading();
  try {
    const res = await fetch(`${API_END_POINT}${url}`, { ...opitons, headers: { "x-username": X_USERNAME, "Content-Type": "application/json" } });
    if (res.ok) return await res.json();
    throw new Error("api 통신 중 이상");
  } catch (error) {
    console.log(error.message);
  } finally {
    hideLoading();
  }
};

export const getDocumentsTree = async () => {
  return await request("");
};

export const getDocumentContent = async (url) => {
  return await request(url);
};

export const createDocument = async (title, parentId = null) => {
  const bodyValue = JSON.stringify({ title, parent: parentId });
  const response = await request("", { method: "POST", body: bodyValue });
  return response;
};

export const updateDocument = async (url, value) => {
  const bodyValue = JSON.stringify(value);
  await request(url, { method: "PUT", body: bodyValue });
};

export const deleteDocument = async (url) => {
  await request(url, { method: "DELETE" });
};
