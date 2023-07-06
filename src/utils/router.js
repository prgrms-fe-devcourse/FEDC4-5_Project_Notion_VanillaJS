const NAVIGATE_EVENT_KEY = 'navigate';

export const initRouteEvents = (onRoute) => {
  window.addEventListener(NAVIGATE_EVENT_KEY, (e) => {
    const { nextUrl } = e.detail;
    if (!nextUrl) return;

    if (window.location.pathname === nextUrl) history.replaceState(null, null, nextUrl);
    else history.pushState(null, null, nextUrl);
    onRoute();
  });

  window.addEventListener('popstate', (e) => {
    onRoute();
  });

  window.addEventListener('click', (e) => {
    const $link = e.target.closest('a');
    if (!$link) return;

    e.preventDefault();
    navigate($link.getAttribute('href'));
  });
}

/**
 * history API를 활용하여 페이지를 nextUrl로 이동합니다.
 * @param {string} nextUrl 
 */
export const navigate = (nextUrl) => {
  window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT_KEY, { detail: { nextUrl } }));
};
