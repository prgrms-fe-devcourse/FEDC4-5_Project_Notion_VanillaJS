import { initRouter } from '../utils/router.js';
import DocumentListSection from './DocumentList/DocumentListSection.js';

export default function App({ $parent }) {
  new DocumentListSection({
    $parent,
  });

  initRouter();
}
