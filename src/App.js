import { checkRouteValidation } from './utils/Validation.js';
import { init, routeChange } from './utils/Route.js';
import { getRootAPI, getContentAPI } from './utils/API.js';
import ListPage from './page/ListPage.js';
import EditPage from './page/EditPage.js';

export default class App {
  constructor(target, rootDocument) {
    this.$target = target;
    this.$listPage = new ListPage(
      this.$target,
      rootDocument,
      this.selectDocument
    );
    this.$editPage = null;
    init(this.route);
    this.route();
  }

  route = () => {
    const { pathname } = location;

    if (checkRouteValidation(pathname) === true) {
      this.$editPage = new EditPage(
        this.$target,
        pathname,
        this.selectDocument,
        this.reflectTitleChange
      );
    }
    else {
      const $editPage = document.querySelector('.content-page-container');
      this.$target.removeChild($editPage);
    }
    this.addRouteEvent();
  };

  addRouteEvent = () => {
    window.addEventListener('popstate', this.route);
  };

  selectDocument = (selectedDocumentId) => {
    const nextRoute = selectedDocumentId === null
    ? `/`
    : `/documents/${selectedDocumentId}`

    routeChange(nextRoute);
  };

  reflectTitleChange = async() => {
    const rootDocument = await getRootAPI();
    this.$listPage.setState(rootDocument);
  }
}
