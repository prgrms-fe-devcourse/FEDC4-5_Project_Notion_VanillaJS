export function debounce(callback, delay) {
  let timer;

  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback(...arguments);
    }, delay);
  };
}
