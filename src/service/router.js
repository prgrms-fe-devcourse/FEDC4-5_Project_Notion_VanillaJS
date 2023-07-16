import { HISTORY_PUSH, HISTORY_REPLACE } from "../constants/index.js";

const ROUTE_CHANGE_EVENT_NAME = "router-change";

export const initRouter = (onRoute) => {
  window.addEventListener("popstate", () => onRoute());

  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl, option } = e.detail;

    if (nextUrl) {
      if (option === HISTORY_PUSH) {
        history.pushState(null, null, nextUrl);
        onRoute();
      }

      if (option === HISTORY_REPLACE) {
        history.replaceState(null, null, nextUrl);
        onRoute();
      }
    }
  });
};

export const pushHistory = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
        option: HISTORY_PUSH,
      },
    })
  );
};

export const replaceHistory = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
        option: HISTORY_REPLACE,
      },
    })
  );
};
