let timer = null;
export const debounce = (targetFunc, time) => {
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(targetFunc, time);
};
