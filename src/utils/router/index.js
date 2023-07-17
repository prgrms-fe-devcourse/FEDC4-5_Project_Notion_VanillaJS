const ROUTE_CHANGE_EVENT_NAME = 'route-change';
const POPSTATE_EVENT_NAME = 'popstate';

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;
    history.pushState(null, null, nextUrl);
    onRoute();
  });
  window.addEventListener(POPSTATE_EVENT_NAME, () => {
    onRoute();
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: { nextUrl },
    }),
  );
};
