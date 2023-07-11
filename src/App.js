import { init, routeChange } from './utils/Route.js';
import { getRootAPI } from './utils/API.js';
import ListPage from './page/ListPage.js';
import EditPage from './page/EditPage.js';

export default class App {
  constructor(target, rootDocument) {
    this.$target = target;
    this.state = { rootDocument };
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
    window.addEventListener('popstate', this.route);
  };

  selectDocument = (selectedDocumentId) => {
    const nextRoute =
      selectedDocumentId === null ? `/` : `/documents/${selectedDocumentId}`;
    routeChange(nextRoute);
  };

  reflectTitleChange = async () => {
    const rootDocument = await getRootAPI();
    this.$listPage.setState(rootDocument);
  };

  render = () => {
    this.$listPage = new ListPage(
      this.$target,
      this.state.rootDocument,
      this.selectDocument
    );
    this.$editPage = new EditPage(
      this.$target,
      location.pathname,
      this.selectDocument,
      this.reflectTitleChange
    );
  };
}
