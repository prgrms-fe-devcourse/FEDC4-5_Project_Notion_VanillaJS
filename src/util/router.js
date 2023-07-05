import store from "./Store.js";

const handlePopState = () => {
  const { pathname } = window.location;
  const [, pathSegment, id] = pathname.split("/");
  store.documentsGet();
  if (pathSegment === "documents") {
    store.documentGet(id);
  } else {
    store.notifyEditor();
  }
};

export const popRouter = () => {
  window.addEventListener("popstate", handlePopState);
  handlePopState();
};
