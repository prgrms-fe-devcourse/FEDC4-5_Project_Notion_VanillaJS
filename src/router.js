export class Router {
  constructor() {
    this.callbacks = [];
    this.init();
  }
  observe(callback) {
    this.callbacks.push(callback);
  }
  notify() {
    this.callbacks.forEach(callback => callback());
  }
  push(url) {
    history.pushState(null, null, url);
    this.notify();
  }
  replace(url) {
    history.replaceState(null, null, url);
    this.notify();
  }
  getUrl() {
    return location.pathname;
  }
  getQuery() {
    const searchParams = new URLSearchParams(
      location.search
    );
    return [...searchParams.entries()].reduce(
      (query, [key, value]) => {
        query[key] = value;
        return query;
      },
      {}
    );
  }
  init() {
    window.addEventListener("popstate", () => {
      this.notify();
    });
  }
}
