import DocumentsPage from './DocumentsPage.js';
import ListComponent from './ListComponent.js';
import { initRouter } from './router.js';

export default function App({ target }) {
  const listComponent = new ListComponent({ target });

  const docsPage = new DocumentsPage({
    target,
    initialState: {
      id: 'new',
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      listComponent.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , id] = pathname.split('/');
      listComponent.render();
      docsPage.sendId(id);
    }
  };

  this.route();
  initRouter(() => this.route());
}
