// 커스텀 이벤트 이름을 상수로 정의
const PAGE_CHANGE_EVENT_NAME = 'route-change';

// 라우터를 초기화하는 함수.
//주어진 onRoute 함수를 실행하기 위해 커스텀 이벤트에 이벤트 리스너를 추가.

export const initRouter = (onRoute) => {
  window.addEventListener(PAGE_CHANGE_EVENT_NAME, (e) => {
    const { nextURL } = e.detail;
    if (nextURL) {
      window.history.pushState(null, null, nextURL);
      onRoute();
    }
  });
};

// 주어진 nextURL로 커스텀 이벤트를 발생.
export const push = (nextURL) => {
  window.dispatchEvent(
    new CustomEvent(PAGE_CHANGE_EVENT_NAME, {
      detail: {
        nextURL,
      },
    })
  );
};
