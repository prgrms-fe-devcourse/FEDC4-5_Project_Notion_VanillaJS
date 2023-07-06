import {
  createDocument,
  deleteDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
} from '../api/api.js';
import { initRouter, push } from '../utils/router.js';
import DocumentListSection from './DocumentList/DocumentListSection.js';
import RootPage from '../pages/RootPage.js';
import EditPage from '../pages/EditPage.js';

export default function App({
  $parent,
  initialState = {
    documents: [],
    id: '',
    title: '',
    content: '',
  },
}) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;

    documentListSection.setState({
      ...this.state,
    });

    editPage.setState({
      ...this.state,
    });
  };

  const documentListSection = new DocumentListSection({
    $parent,
    initialState: { ...this.state },
    onClickTitle: () => {
      push('/');
    },

    onClickRootAdd: async e => {
      const newRootDocument = await createDocument('제목없음', null);
      push(`/documents/${newRootDocument.id}`);
    },

    onClickDocument: async e => {
      if (e.target.classList.contains('delete-button')) return;
      if (e.target.classList.contains('newSubDoc-button')) return;
      const $li = e.target.closest('li');
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    },

    onClickAdd: async e => {
      if (e.target.classList.contains('newSubDoc-button')) {
        const $li = e.target.closest('li');
        const { id } = $li.dataset;

        const newSubDocument = await createDocument('제목없음', id);
        push(`/documents/${newSubDocument.id}`);
      }
    },
    onClickDelete: async e => {
      if (e.target.classList.contains('delete-button')) {
        const $li = e.target.closest('li');
        const { id } = $li.dataset;
        await deleteDocument(id);
        push('/');
      }
    },
  });

  const $pageSection = document.createElement('div');
  $pageSection.classList.add('editor_page');
  $parent.appendChild($pageSection);

  let timer = null;

  const rootPage = new RootPage({ $parent: $pageSection });
  const editPage = new EditPage({
    $parent: $pageSection,
    initialState: this.state,

    onEditing: e => {
      const name = e.target.getAttribute('name');
      if (name === 'title') {
        this.setState({
          ...this.state,
          title: e.target.value,
        });
      } else if (name === 'content') {
        this.setState({
          ...this.state,
          content: e.target.value,
        });
      }

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await updateDocument(
          this.state.id,
          this.state.title,
          this.state.content,
        );

        const documents = await getAllDocuments();
        this.setState({
          ...this.state,
          documents,
        });
      }, 1000);
    },
  });

  this.route = async () => {
    const { pathname } = window.location;

    const documents = await getAllDocuments();

    if (pathname === '/') {
      $pageSection.innerHTML = '';
      this.setState({
        ...this.state,
        documents,
        id: '',
        title: '',
        content: '',
      });
      rootPage.init();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      $pageSection.innerHTML = '';

      const document = await getDocument(documentId);
      this.setState({
        ...this.state,
        documents,
        id: document.id,
        title: document.title,
        content: document.content,
      });
      editPage.init();
    }
  };

  this.route();

  initRouter(() => this.route());
}
