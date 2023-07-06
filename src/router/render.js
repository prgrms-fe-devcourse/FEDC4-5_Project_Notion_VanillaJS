import { navigate } from './utils.js';
import renderDocumentPage from './pages/documents.js';

/**
 * 현재 페이지에 맞는 렌더링 함수를 호출합니다.
 * @param  {...any} props 하위 렌더링 함수에 전달할 인자들
 */
const renderPage = (...props) => {
  const { pathname } = window.location;

  if (pathname === '/') navigate('/documents/0');
  else if (/^\/documents\/\d/.test(pathname)) renderDocumentPage(...props);
  else navigate('/documents/0');
};

export default renderPage;
