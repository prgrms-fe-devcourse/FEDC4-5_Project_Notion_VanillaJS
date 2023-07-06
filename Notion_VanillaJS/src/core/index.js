export { default as Component } from './Component';
export { default as Store } from './Store';
export { default as Router } from './Router';
import { ROUTE_CHNAGE_EVENT } from '@/constants/eventName';

const navigate = (nextUrl, isReplace = false) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHNAGE_EVENT, {
      detail: {
        nextUrl,
        isReplace,
      },
    })
  );
};

export const push = (nextUrl) => {
  navigate(nextUrl);
};
export const replace = (nextUrl) => {
  navigate(nextUrl, true);
};
