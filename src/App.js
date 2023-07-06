import { initRouter } from '@router';
import HeaderWrapper from '@components/HeaderWrapper';
import ContentWrapper from '@components/ContentWrapper';
import './style.css';
import { setCurrentDocumentId } from '@global';
import request from '@api';

export default function App({ $target }) {
  // 헤더 섹션
  new HeaderWrapper({ $target, initialState: 'Notion Clone Web App' });
  // 메인 컨텐츠 섹션
  const contentWrapper = new ContentWrapper({ $target, initialState: [] });

  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === '/' || pathname === '/documents') {
      contentWrapper.setState({ documentId: '' });
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , id, status] = pathname.split('/');
      const res = await request(`/documents/${id}`);
      setCurrentDocumentId(id);
      contentWrapper.setState({ documentId: id, status, res });
    }
  };

  this.route();

  initRouter(this.route.bind(this));
}
