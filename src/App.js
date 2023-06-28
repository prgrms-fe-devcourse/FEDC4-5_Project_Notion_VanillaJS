import DocumentDetailPage from "./DocumentDetailPage.js";
import DocumentList from "./DocumentList.js";
import { initRouter } from "./services/router.js";

export default function App({ $target }) {
  const documentList = new DocumentList({
    $target,
  });

  const documentDetailPage = new DocumentDetailPage({
    $target,
    reRenderDocList: documentList.setState
  })
  

  this.route = () => {
    // $target.replace();
    const { pathname } = window.location;
    if (pathname === '/') {
      // 별다른 편집기 선택이 안 된 상태
    } else if (pathname.indexOf('/documents/') === 0) {
      // 하나의 문서를 선택한 상태
      const [, , documentId] = pathname.split('/');
      documentDetailPage.setState(documentId);
    }
  }

  this.route();

  initRouter(this.route);
}