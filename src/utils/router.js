const POPSTATE_EVENT = 'popstate';
const HISTORY_PUSH_EVENT = 'history-push';
const HISTORY_REPLACE_EVENT = 'history-replace';

const initPopstateEventListener = (onRoute) => {
  window.addEventListener(POPSTATE_EVENT, () => {
    onRoute();
  });
};

const initHistoryPushEventListener = (onRoute) => {
  window.addEventListener(HISTORY_PUSH_EVENT, (e) => {
    const { nextUrl } = e.detail;

    if (!nextUrl) return;

    window.history.pushState(null, null, nextUrl);
    onRoute();
  });
};

const initHistoryReplaceEventListener = (onRoute) => {
  window.addEventListener(HISTORY_REPLACE_EVENT, (e) => {
    const { nextUrl } = e.detail;

    if (!nextUrl) return;

    window.history.replaceState(null, null, nextUrl);
    onRoute();
  });
};

export const initRouter = (onRoute) => {
  initPopstateEventListener(onRoute);
  initHistoryPushEventListener(onRoute);
  initHistoryReplaceEventListener(onRoute);
};

const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(HISTORY_PUSH_EVENT, {
      detail: { nextUrl },
    })
  );
};

const replace = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(HISTORY_REPLACE_EVENT, {
      detail: { nextUrl },
    })
  );
};

export const history = { push, replace };
