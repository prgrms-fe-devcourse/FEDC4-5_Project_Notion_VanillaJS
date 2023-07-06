const ROUTE_CHANGE_EVENT_NAME = "router-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl, option } = e.detail;

    if (nextUrl) {
      if (option === "push") {
        history.pushState(null, null, nextUrl);
        onRoute();
      }

      if (option === "replace") {
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
        option: "push",
      },
    })
  );
};

export const replaceHistory = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
        option: "replace",
      },
    })
  );
};
