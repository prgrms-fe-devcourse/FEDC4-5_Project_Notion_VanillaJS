import { init, routeChange } from './utils/Route.js';
import ListPage from './page/ListPage.js';
import EditPage from './page/EditPage.js';

export default class App {
  constructor(target) {
    this.$target = target;
    this.$listPage = null;
    this.$editPage = null;
    init(this.route);
    this.render();
    this.route();
  }

  route = () => {
    const { pathname } = location;

    this.$editPage.setPathName(pathname);
  };

  addRouteEvent = () => {
    window.addEventListener('popstate', () => this.route);
  };

  selectDocument = (selectedDocumentId) => {
    if (selectedDocumentId === null || selectedDocumentId === undefined) {
      const nextRoute = '/';
      routeChange(nextRoute);
    } else {
      const nextRoute = `/documents/${selectedDocumentId}`;
      routeChange(nextRoute);
    }
  };

  reflectTitleChange = () => {
    this.$listPage.fetchRootDocument();
  };

  render = () => {
    this.$listPage = new ListPage(
      this.$target,
      {
        rootDocument: null,
      },
      this.selectDocument,
    );
    this.$editPage = new EditPage(
      this.$target,
      location.pathname,
      this.selectDocument,
      this.reflectTitleChange,
    );
  };
}
