let timer = null;

export const debounce = (callback, timeout = 300) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    callback();
  }, timeout);
};
