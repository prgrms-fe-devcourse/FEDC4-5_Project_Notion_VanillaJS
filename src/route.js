import { PAGE_CHANGE_TYPE, PAGE_CHANGE_EVENT_NAME } from './constants/route.js';

export const initRouter = (onRoute) => {
  window.addEventListener(PAGE_CHANGE_EVENT_NAME, (e) => {
    const { nextURL, type } = e.detail;
    const { PUSH, REPLACE } = PAGE_CHANGE_TYPE;

    if (nextURL && type === PUSH) {
      window.history.pushState(null, null, nextURL);
      onRoute();
      return;
    }

    if (nextURL && type === REPLACE) {
      window.history.replaceState(null, null, nextURL);
      onRoute();
      return;
    }
  });
};

export const customPush = (nextURL, type) => {
  window.dispatchEvent(
    new CustomEvent(PAGE_CHANGE_EVENT_NAME, {
      //type:push이거나 replace이거나
      detail: {
        nextURL,
        type,
      },
    })
  );
};
