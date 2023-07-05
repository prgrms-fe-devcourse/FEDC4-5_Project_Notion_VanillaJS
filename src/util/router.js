import { ROUTER_EVENT_NAME } from "../constant.js";

export const initRoute = (onRoute) => {
  window.addEventListener(ROUTER_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTER_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    })
  );
};
