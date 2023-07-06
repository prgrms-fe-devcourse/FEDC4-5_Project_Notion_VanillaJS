import DocumentListPage from './Sidebar/DocumentListPage.js';
import EditPage from './Editor/EditPage.js';

export default function App({ $target }) {
  const $sidebar = document.createElement('aside');
  const $editor = document.createElement('section');

  const documentListPage = new DocumentListPage({ $target: $sidebar });
  const editPage = new EditPage({
    $target: $editor,
    initialState: {
      documentId: 'new',
    },
  });

  this.route = () => {
    $target.append($sidebar, $editor);
    const { pathname } = window.location;
    if (pathname === '/') {
      documentListPage.render();
      editPage.render();
    }
  };
  this.route();
}
