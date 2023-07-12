function createHashRouter() {
  const callbacks = [];

  function observe(callback) {
    callbacks.push(callback);
  }

  function notify() {
    if (callbacks.length > 0) {
      callbacks.forEach((callback) => callback());
    }
  }
  function push(path) {
    window.location.hash = path;
  }

  function getUrl() {
    return location.hash.replace("#", "");
  }

  function init() {
    window.addEventListener("hashchange", notify);
  }

  init();

  return {
    observe,
    notify,
    push,
    get url() {
      return getUrl();
    },
  };
}

export const hashRouter = createHashRouter();
