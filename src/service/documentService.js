import { request } from "../api.js";
import { DocumentTree, Document } from "../domain/index.js";
import { hashRouter } from "../router/hashRouter.js";
import { getDocumentFromStorage } from "./index.js";

const DOCUMENT_KEY = "/documents";

export const getDocumentTree = async () => {
  return await request(DOCUMENT_KEY, {
    mothod: "GET",
  }).then((res) => {
    return new DocumentTree({ documentTree: res, isInput: false });
  });
};

export const getDocument = async () => {
  return await request(`${DOCUMENT_KEY}/${hashRouter.url}`, {
    mothod: "GET",
  }).then((res) => {
    if (res.content === null) {
      res.content = "";
    }
    return new Document(res);
  });
};

export const getRecentDocument = async (documentId) => {
  const serverDocument = await getDocument(documentId);
  const storageDocument = getDocumentFromStorage(documentId);
  console.log(serverDocument);
  console.log(storageDocument);

  if (
    storageDocument &&
    serverDocument.updateAt < storageDocument.tmpSaveDate
  ) {
    return storageDocument;
  } else {
    return serverDocument;
  }
};

export const getDocumentIdByPathname = () => {
  const { pathname } = window.location;
  const splitedPathname = pathname.split("/");
  const documentId = splitedPathname[splitedPathname.length - 1];
  return documentId;
};

export const saveDocumentToServer = async ({ title, content }) => {
  await request(`${DOCUMENT_KEY}/${getDocumentIdByPathname()}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });
};

export const updateDocumentTree = async ({ documentTree }) => {
  documentTree.state = await getDocumentTree();
};
