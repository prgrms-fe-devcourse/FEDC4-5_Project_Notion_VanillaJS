import { initRouter } from './route.js';
import DocumentEditPage from './Page/DocumentEditPage.js';
import DocumentPage from './Page/DocumentPage.js';

export default function App({ $target, initalState }) {
  const documentPage = new DocumentPage({
    $target,
    initalState,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initalState: {
      documentId: 'new',
      document: {
        title: '',
        content: '',
      },
    },
    onChangeEditorTitle: () => {
      documentPage.render();
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    documentPage.render();

    if (pathname === '/') {
      documentEditPage.setState({
        documentId: 'new',
      });
    } else if (pathname.includes('/documents/')) {
      const [, , documentId] = pathname.split('/');

      documentEditPage.setState({ documentId });
    }
  };

  this.route();

  initRouter(this.route);
}
