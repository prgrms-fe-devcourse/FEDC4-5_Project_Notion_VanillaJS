const ROUTER_CHANGE_EVENT = 'ROUTER_CHANGE';

export const init = (routerCallBack) => {
  window.addEventListener(ROUTER_CHANGE_EVENT, () => {
    routerCallBack();
  });
};

export const routeChange = (url, params) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(ROUTER_CHANGE_EVENT), params);
};
