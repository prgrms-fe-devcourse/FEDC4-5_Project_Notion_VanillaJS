export const initRouter = onRoute => {
  window.addEventListener("route-change", e => {
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

export const push = nextUrl => {
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: { nextUrl, option: "push" },
    })
  );
};

export const replace = nextUrl => {
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: { nextUrl, option: "replace" },
    })
  );
};
