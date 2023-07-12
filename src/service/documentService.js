import { request } from "../api.js";
import { DocumentTree, Document } from "../domain/index.js";
import { hashRouter } from "../router/hashRouter.js";
import { getDocumentFromStorage, cloneDomain } from "./index.js";
import { initDocument } from "../constants.js/constants.js";

const DOCUMENT_KEY = "/documents";

export const getDocumentTree = async () => {
  return await request(DOCUMENT_KEY, {
    mothod: "GET",
  }).then((res) => {
    return new DocumentTree({ documentTree: res, isInput: false });
  });
};

export const getDocument = async () => {
  if (hashRouter.url === "") {
    console.log("init");
    console.log(initDocument);
    return new Document(initDocument);
  }
  return await request(`${DOCUMENT_KEY}/${hashRouter.url}`, {
    mothod: "GET",
  }).then((res) => {
    if (res.content === null) {
      res.content = "";
    }
    return new Document(res);
  });
};

export const getRecentDocument = async () => {
  const documentId = hashRouter.url;
  const serverDocument = await getDocument(documentId);
  const storageDocument = getDocumentFromStorage(documentId);

  const updateDate = new Date(serverDocument.updatedAt);
  const tmpSaveDate = new Date(storageDocument.tmpSaveDate);

  if (storageDocument && updateDate.getTime() < tmpSaveDate.getTime()) {
    return cloneDomain({
      domain: serverDocument,
      newPropertie: { ...storageDocument },
    });
    // return serverDocument.clone({
    //   title: storageDocument.title,
    //   content: storageDocument.content,
    //   updatedAt: storageDocument.tmpSaveDate,
    // });
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
  console.log("saveDocumentToServer", title, content);
  await request(`${DOCUMENT_KEY}/${hashRouter.url}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });
};

export const updateDocumentTree = async ({ documentTree }) => {
  documentTree.state = await getDocumentTree();
};
