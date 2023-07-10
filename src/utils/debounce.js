export const debounce = (callback, time) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback.apply(this, args);
    }, time);
  };
};
