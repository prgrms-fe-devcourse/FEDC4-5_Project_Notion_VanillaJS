import DocumentDetailPage from "./components/DocumentDetailPage.js";
import DocumentsList from "./components/DocumentsList.js";
import { initRouter } from "../../services/router.js"

export default function MainPage({ $target }) {
  // sidebar의 documents들을 출력하는 리스트 컴포넌트
  const documentList = new DocumentsList({
    $target,
  });

  // 하나의 document를 수정하거나 확인하는 컴포넌트
  const documentDetailPage = new DocumentDetailPage({
    $target,
    isDocument: documentList.isDocument,
    reRenderDocList: documentList.setState
  })
  

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      // 별다른 편집기 선택이 안 된 상태
      documentDetailPage.setState(null);
    } else if (pathname.indexOf('/documents/') === 0) {
      // 하나의 문서를 선택한 상태
      const [, , documentId] = pathname.split('/');
      documentDetailPage.setState(documentId);
    }
  }

  this.route();

  initRouter(this.route);
}