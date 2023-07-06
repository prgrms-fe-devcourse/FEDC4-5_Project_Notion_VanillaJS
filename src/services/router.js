const ROUTE_CHANGE_EVENT = "route-change";
const ROUTE_REPLACE_EVENT = "route-replace";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, (event) => {
    const { nextUrl } = event.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });

  window.addEventListener(ROUTE_REPLACE_EVENT, (event) => {
    const { replaceUrl } = event.detail;

    if (replaceUrl) {
      history.replaceState(null, null, replaceUrl);
      onRoute();
    }
  });

  window.addEventListener("popstate", (event) => {
    onRoute();
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT, {
      detail: {
        nextUrl,
      },
    })
  );
};

export const replace = (replaceUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_REPLACE_EVENT, {
      detail: {
        replaceUrl,
      },
    })
  );
};
