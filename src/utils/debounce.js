const setDebounce = () => {
  let timer = null;
  return (callback, delayTime) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, delayTime);
  };
};

export const debounce = setDebounce();
