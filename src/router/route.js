import {
  getDocument,
  removeDocumentFromStorage,
  getDocumentFromStorage,
} from "../service/index.js";

export const route = async ({ component, url }) => {
  history.pushState(null, null, url);
  const urlSplit = url.split("/");
  const [routeName, documentId] = urlSplit.slice(
    urlSplit.length - 2,
    urlSplit.length
  );
  switch (routeName) {
    case "documents":
      getRecentDocument(documentId);

      component.state = savedDocument;
      removeDocumentFromStorage(documentId);
      break;
  }
};
