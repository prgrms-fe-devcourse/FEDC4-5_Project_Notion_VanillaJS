const ROUTE_CHANGE_EVENT_NAME = 'route-change';

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      // 페이지를 제대로 이동해야 하기 때문에 pustState 으로 이동한다.
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

// 클릭이벤트를 감지안해도 url이 바꼈을때 감지하는 역할
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
