import store from "./Store.js";

const handlePopState = () => {
  store.documentsGet();
  store.documentGet(window.location.pathname.substring(1));
};

export const popRouter = () => {
  window.addEventListener("popstate", handlePopState);
  handlePopState();
};
