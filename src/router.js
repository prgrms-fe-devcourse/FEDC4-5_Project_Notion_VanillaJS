const initRoute = (onRoute) => {
  window.addEventListener("route-change", (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: {
        nextUrl,
      },
    })
  );
};

export { initRoute, push };
