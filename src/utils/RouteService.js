export class RouteService {
  #routes;

  constructor() {
    if (!RouteService.instance) {
      RouteService.instance = this;
      this.#routes = [];
      window.addEventListener('popstate', () => this.#route());
    }
    return RouteService.instance;
  }

  #route() {
    const currentRoute = this.#routes.find((route) => route.match(window.location.pathname));
    currentRoute.page();
  }

  addRoute({ match, page }) {
    this.#routes.push({ match, page });
    return this;
  }

  start() {
    this.#route();
  }

  push(url) {
    history.pushState(null, null, url);
    this.#route();
  }

  replace(url) {
    history.replaceState(null, null, url);
    this.#route();
  }
}
