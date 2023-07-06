import { ROUTE_CHANGE_EVENT_NAME } from "../constant/constant.js";

export const initRouter = (onRoute) => {
  history.replaceState(null, null, "/");
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const url = e.detail;
    history.pushState(null, null, `${url}`);
    onRoute();
  });
};

export const push = (id = null) => {
  if (id !== null) {
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT_NAME, { detail: `/documents/${id}` }));
  } else {
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT_NAME, { detail: `/` }));
  }
};
