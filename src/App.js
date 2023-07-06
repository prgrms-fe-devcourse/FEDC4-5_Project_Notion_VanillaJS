import DocumentsPage from './DocumentsPage.js';
import ListComponent from './ListComponent.js';
import { initRouter } from './router.js';

// url 규칙
// 루트: DocumentList만 그리기
// ListComponent -> /documents : DocumentList + DocumentList에 새 document 목록생성
// DocumentsPage -> /docuements/{id} : DocumentList + id에 해당하는 doc 그리기

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
