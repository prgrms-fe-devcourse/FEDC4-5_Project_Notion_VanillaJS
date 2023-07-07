import DocumentListPage from './Sidebar/DocumentListPage.js';
import EditPage from './Editor/EditPage.js';
import ListHeader from './Sidebar/ListHeader.js';

export default function App({ $target }) {
  const $sidebar = document.createElement('aside');
  $sidebar.className = 'sidebar';
  const $editor = document.createElement('section');

  new ListHeader({
    $target: $sidebar,
    onNewDocument: () => {
      console.log('새로운 문서');
      const nextState = {
        documentId: 'new',
        parent: null,
      };
      editPage.setState(nextState);
    },
  });

  const documentListPage = new DocumentListPage({
    $target: $sidebar,
  });

  const editPage = new EditPage({
    $target: $editor,
    initialState: {
      documentId: 'new',
      document: {
        title: '',
        content: '',
      },
      parent: null,
    },
  });

  this.route = () => {
    $target.append($sidebar, $editor);
    const { pathname } = window.location;
    if (pathname === '/') {
      documentListPage.setState();
      editPage.render();
    }
  };
  this.route();
}
