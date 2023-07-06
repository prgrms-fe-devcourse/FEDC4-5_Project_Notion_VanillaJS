import SidebarPage from './pages/sidebar/SidebarPage.js';
import EditorPage from './pages/editor/EditorPage.js';
import { initRouter } from '../utils/router.js';

export default function App({ $target }) {
  const sidebarPage = new SidebarPage({
    $target,
    initialState: [],
  });

  const editorPage = new EditorPage({
    $target,
    initialState: {},
    onRerender: () => {
      sidebarPage.setState();
    },
  });

  this.route = () => {
    $target.innerHTML = '';

    const { pathname } = window.location;

    if (pathname === '/') {
      sidebarPage.setState();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      sidebarPage.setState();
      editorPage.setState({ documentId });
    }
  };

  this.route();

  initRouter(() => this.route());

  window.addEventListener('popstate', () => this.route());
}
