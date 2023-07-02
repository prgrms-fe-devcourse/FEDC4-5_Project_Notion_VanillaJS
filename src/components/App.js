import { initRouter } from '../utils/router.js';
import DocumentListSection from './DocumentList/DocumentListSection.js';

export default function App({ $parent }) {
  const documentListSection = new DocumentListSection({
    $parent,
  });

  this.route = () => {
    $parent.innerHTML = '';
    const { pathname } = window.location;

    if (pathname === '/') {
      documentListSection.setState();
    }
  };

  this.route();

  initRouter();
}
