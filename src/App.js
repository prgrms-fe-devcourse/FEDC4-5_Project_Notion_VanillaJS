import DocumentEditPage from './pages/mainPage/DocumentEditPage';
import HomePage from './pages/mainPage/HomePage';
import SidebarDocumentPage from './pages/sidebarPage/SidebarDocumentPage';
import { initRouter } from './domain/router';
import { validateComponent } from './utils/validation';

export default function App({ $target }) {
  validateComponent(new.target);

  // 페이지 및 컴포넌트 초기화
  const $sidebarDocumentArea = document.createElement('div');
  $sidebarDocumentArea.classList.add('sidebar-document__area');
  $target.appendChild($sidebarDocumentArea);

  const $editDocumentArea = document.createElement('div');
  $editDocumentArea.classList.add('edit-document__area');
  $target.appendChild($editDocumentArea);

  const sidebarDocumentPage = new SidebarDocumentPage({
    $target: $sidebarDocumentArea,
  });

  const homePage = new HomePage({
    $target: $editDocumentArea,
  });

  const documentEditPage = new DocumentEditPage({
    $target: $editDocumentArea,
    initialState: {
      documentId: 'new',
      documents: {
        title: '',
        content: '',
      },
    },
    renderDocumentTree: () => {
      sidebarDocumentPage.render();
    },
  });

  // 현재 URL 경로를 기반으로 페이지를 렌더링
  this.route = () => {
    $editDocumentArea.innerHTML = '';
    const { pathname } = window.location;
    if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      documentEditPage.setState({ documentId });
    } else {
      sidebarDocumentPage.render();
      homePage.render();
    }
  };

  // 브라우저의 뒤로 가기 버튼 등에 의한 URL 변경을 감지
  window.addEventListener('popstate', () => this.route());

  this.route();
  initRouter(() => this.route());
}
