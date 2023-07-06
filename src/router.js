const ROUTE_CHANGE_EVENT_NAME = 'route-change';

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

//url이 바꼈을때 감지하는 역할
export const push = (nextUrl) => {
  console.log('확인', nextUrl);
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        // detail에 url을 저장한다.
        nextUrl,
      },
    })
  );
};
