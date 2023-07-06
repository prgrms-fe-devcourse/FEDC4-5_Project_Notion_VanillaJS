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

  // 문서리스트(사이드바) 컴포넌트 불러오기
  const documentListSection = new DocumentListSection({
    $parent,
    initialState: { ...this.state },
    onClickTitle: () => {
      push('/');
    },

    // 새로운 루트 페이지를 생성하는 기능
    onClickRootAdd: async e => {
      const newRootDocument = await createDocument('제목없음', null);
      push(`/documents/${newRootDocument.id}`);
    },

    // 문서 클릭시 문저 정보를 불러오는 기능
    onClickDocument: async e => {
      if (e.target.classList.contains('delete-button')) return;
      if (e.target.classList.contains('newSubDoc-button')) return;
      const $li = e.target.closest('li');
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    },

    // 하위 문서들을 생성하는 기능
    onClickAdd: async e => {
      if (e.target.classList.contains('newSubDoc-button')) {
        const $li = e.target.closest('li');
        const { id } = $li.dataset;

        const newSubDocument = await createDocument('제목없음', id);
        push(`/documents/${newSubDocument.id}`);
      }
    },
    // 문서를 제거하는 기능
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

  let timer = null; // debounce 작업을 위한 타이머

  const rootPage = new RootPage({ $parent: $pageSection });
  const editPage = new EditPage({
    $parent: $pageSection,
    initialState: this.state,

    // 문서 수정 관련 기능
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

      // 입력을 멈추고 1초가 지났을 때 수정 API 호출 - debounce
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

    // 루트 URL에 접속했을 때
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
      $pageSection.innerHTML = ''; // 사이드바에서 문서를 클릭했을 때, 루트페이지 초기화하고 에디터 관련 페이지를 불러온다.

      // url에 특정 문서의 아이디를 입력하여 접속했을 때 정보를 보여주기 위해 API 호출
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
