export const initRouter = onRoute => {
  window.addEventListener(`route-change`, e => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const pushRoute = nextUrl => {
  window.dispatchEvent(
    new CustomEvent('route-change', {
      // 클릭 이벤트가 일어나지 않아도 이벤트를 발생시킬 수 있음
      detail: {
        nextUrl,
      },
    })
  );
};

export const popRoute = onRoute => {
  window.addEventListener('popstate', () => {
    onRoute();
  });
};
