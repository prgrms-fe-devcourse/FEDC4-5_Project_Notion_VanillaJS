import { initRouter } from './route.js';
import DocumentEditPage from './Page/DocumentEditPage.js';
import DocumentPage from './Page/DocumentPage.js';

// 앱은 라우터를 초기화해주고, 두개의 페이지를 만듬!(문서 리스트페이지와, 문서 편집 페이지)

export default function App({ $target, initalState }) {
  const documentPage = new DocumentPage({
    $target,
    initalState,
  });

  // 문서 id에 따라 다른 문서를 그려줘야함. 초기 id는 new로 잡음
  const documentEditPage = new DocumentEditPage({
    $target,
    // 초기 상태 지정
    initalState: {
      documentId: 'new',
      document: {
        title: '',
        content: '',
      },
    },
    // 편집기의 제목이 바뀔때, 문서의 리스트들을 다시 그려주는 험수를 props로 내려줌
    onChangeEditorTitle: () => {
      documentPage.render();
    },
  });

  // pathname에 따라 다른 페이지의 상태를 바꾸고 랜더링을 해줌
  this.route = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      documentPage.render();
      documentEditPage.setState({
        documentId: 'new',
      });
    } else if (pathname.includes('/documents/')) {
      const [, , documentId] = pathname.split('/');

      documentPage.render();
      documentEditPage.setState({ documentId });
    }
  };

  this.route();

  // 라우터 초기화
  initRouter(() => this.route());

  window.addEventListener('popstate', () => this.route());
}
