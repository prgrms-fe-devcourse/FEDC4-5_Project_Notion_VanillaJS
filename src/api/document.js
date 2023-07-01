import { request } from "./request.js";

export const postDocument = async (data) => {
  return await request("/documents", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getDocuments = async () => {
  return await request("/documents");
};
