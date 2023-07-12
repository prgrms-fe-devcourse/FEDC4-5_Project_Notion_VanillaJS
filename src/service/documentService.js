import { request } from "../api.js";
import { DocumentTree, Document, initDocument } from "../domain/index.js";
import { hashRouter } from "../router/hashRouter.js";
import {
  getDocumentFromStorage,
  cloneDomain,
  removeDocumentFromStorage,
} from "./index.js";
import { DOCUMENT_KEY } from "../constant/apiKey.js";

export const getDocumentTree = async () => {
  return await request(DOCUMENT_KEY, {
    mothod: "GET",
  }).then((res) => {
    return new DocumentTree({ documentTree: res, isInput: false });
  });
};

export const getDocument = async () => {
  if (hashRouter.url === "") {
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

  if (
    storageDocument &&
    updateDate < tmpSaveDate &&
    confirm("임시저장된 문서가 있습니다. 불러오시겠습니까?")
  ) {
    return cloneDomain({
      domain: serverDocument,
      newPropertie: {
        content: storageDocument.content,
        title: storageDocument.title,
        updatedAt: storageDocument.tmpSaveDate,
      },
    });
  } else {
    console.log(storageDocument);
    return serverDocument;
  }
};

export const saveDocumentToServer = async ({ title, content }) => {
  await request(`${DOCUMENT_KEY}/${hashRouter.url}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });
};

export const updateDocumentTree = async ({ documentTree }) => {
  documentTree.state = await getDocumentTree();
};
