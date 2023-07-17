export function debounceSaveLocal(callback) {
  const delay = 1000;
  let timer;

  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback(...arguments);
    }, delay);
  };
}

export function debounceSaveServer(callback) {
  const delay = 3000;
  let timer;

  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback(...arguments);
    }, delay);
  };
}
