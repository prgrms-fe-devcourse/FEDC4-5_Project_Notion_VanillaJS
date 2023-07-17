import { initRouter } from '@router';
import HeaderWrapper from '@components/HeaderWrapper';
import ContentWrapper from '@components/ContentWrapper';
import './style.css';
import request from '@api';

export default function App({ $target }) {
  // eslint-disable-next-line no-new
  new HeaderWrapper({ $target, initialState: 'Notion Clone Web App' });

  const contentWrapper = new ContentWrapper({ $target, initialState: [] });

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      contentWrapper.setState({ documentId: '' });
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , id, isDocumentSaved] = pathname.split('/');
      const res = await request(`/documents/${id}`);
      contentWrapper.setState({ documentId: id, isDocumentSaved, res });
    } else {
      window.location.pathname = '/';
    }
  };

  this.route();

  initRouter(this.route.bind(this));
}
