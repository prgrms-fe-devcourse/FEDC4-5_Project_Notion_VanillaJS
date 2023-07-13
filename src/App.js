import NotionPage from './pages/NotionPage.js';
import { initRouter } from './utils/router.js';
import { getItem } from './utils/storage.js';

export default function App({ $target }) {
  const openedDocuments = getItem('opened-documents', []);

  const notionPage = new NotionPage({
    $target,
    initialState: {
      documents: [],
      documentId: null,
      openedDocuments: openedDocuments,
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      notionPage.setState({
        ...notionPage.state,
        documentId: null,
      });
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , id] = pathname.split('/');
      notionPage.setState({
        ...notionPage.state,
        documentId: parseInt(id),
      });
    }
  };

  this.route();

  initRouter(() => this.route());
}
