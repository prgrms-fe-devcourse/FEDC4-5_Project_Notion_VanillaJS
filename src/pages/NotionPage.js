import { request } from '../api.js';
import { getItem, setItem, removeItem } from '../utils/storage.js';
import { push } from '../utils/router.js';
import { TEMP_DOCUMENT_KEY, OPENED_DOCUMENTS_KEY, INIT_DOCUMENT } from '../constants.js';
import DocumentList from '../components/DocumentList.js';
import CreateButton from '../components/CreateButton.js';
import Editor from '../components/Editor.js';

export default function NotionPage({ $target, initialState }) {
  const $sidebarContainer = document.createElement('div');
  const $documentContainer = document.createElement('div');
  $sidebarContainer.classList.add('sidebar-container');
  $documentContainer.classList.add('document-container');
  $target.appendChild($sidebarContainer);

  this.state = initialState;

  let documentLocalSaveKey = `${TEMP_DOCUMENT_KEY(this.state.documentId)}`;
  let timer = null;
  const doc = getItem(documentLocalSaveKey, INIT_DOCUMENT);

  const documentList = new DocumentList({
    $target: $sidebarContainer,
    initialState: {
      documents: this.state.documents,
      documentId: this.state.documentId,
      openedDocuments: this.state.openedDocuments,
    },
    onToggle: (id, $ul) => {
      const index = this.state.openedDocuments.indexOf(parseInt(id));

      if (index > -1) {
        // 토글 닫기
        const copyOpenedDocuments = [...this.state.openedDocuments];
        copyOpenedDocuments.splice(index, 1);

        closeSubList($ul, copyOpenedDocuments);

        this.setState({
          ...this.state,
          openedDocuments: copyOpenedDocuments,
        });
        setItem(OPENED_DOCUMENTS_KEY, copyOpenedDocuments);
      } else {
        // 토글 열기
        this.setState({
          ...this.state,
          openedDocuments: [...this.state.openedDocuments, parseInt(id)],
        });
        setItem(OPENED_DOCUMENTS_KEY, this.state.openedDocuments);
      }
    },
    onCreate: async (id) => {
      const createdDocument = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({ title: '', parent: id }),
      });
      await fetchDocuments();

      push(`/documents/${createdDocument.id}`);

      this.setState({
        ...this.state,
        openedDocuments: [...this.state.openedDocuments, id],
      });
      setItem(OPENED_DOCUMENTS_KEY, this.state.openedDocuments);
    },
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      });
      await fetchDocuments();

      if (id === this.state.documentId) {
        if (this.state.documents.length > 0) {
          push(`/documents/${this.state.documents[0].id}`);
        } else {
          push('/');
        }
      } else {
        if (this.state.documentId) {
          push(`/documents/${this.state.documentId}`);
        } else {
          push('/');
        }
      }

      const index = this.state.openedDocuments.indexOf(id);

      if (index > -1) {
        const copyOpenedDocuments = [...this.state.openedDocuments];
        copyOpenedDocuments.splice(index, 1);

        this.setState({
          ...this.state,
          openedDocuments: copyOpenedDocuments,
        });
        setItem(OPENED_DOCUMENTS_KEY, copyOpenedDocuments);
      }
    },
  });

  new CreateButton({
    $target: $sidebarContainer,
    initialState: {
      text: '페이지 추가',
    },
    onClick: async () => {
      const createdDocument = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({ title: '', parent: null }),
      });
      await fetchDocuments();

      push(`/documents/${createdDocument.id}`);
    },
  });

  const editor = new Editor({
    $target: $documentContainer,
    initialState: doc,
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveDate: new Date(),
        });

        await request(`/documents/${this.state.documentId}`, {
          method: 'PUT',
          body: JSON.stringify(document),
        });
        removeItem(documentLocalSaveKey);

        await fetchDocument();
        await fetchDocuments();
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      documentLocalSaveKey = `${TEMP_DOCUMENT_KEY(nextState.documentId)}`;
      this.state = nextState;

      await fetchDocument();
      this.render();

      return;
    }

    this.state = nextState;

    documentList.setState({
      documentId: this.state.documentId,
      documents: this.state.documents,
      openedDocuments: this.state.openedDocuments,
    });

    editor.setState(this.state.document || INIT_DOCUMENT);
  };

  // 하위 목록 토글 닫기
  const closeSubList = ($ul, copyOpenedDocuments) => {
    if ($ul) {
      $ul.querySelectorAll('li').forEach(($li) => {
        const { id } = $li.dataset;
        const index = [...copyOpenedDocuments].indexOf(parseInt(id));
        if (index > -1) {
          copyOpenedDocuments.splice(index, 1);
          closeSubList($li.querySelector('ul'), copyOpenedDocuments);
        }
      });
    }
  };

  const fetchDocuments = async () => {
    const documents = await request('/documents');

    this.setState({
      ...this.state,
      documents,
    });
  };

  const fetchDocument = async () => {
    const { documentId } = this.state;

    if (documentId) {
      const document = await request(`/documents/${documentId}`);

      const tempDocument = getItem(documentLocalSaveKey, INIT_DOCUMENT);

      if (tempDocument.tempSaveDate && tempDocument.tempSaveDate > document.updatedAt) {
        if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
          this.setState({
            ...this.state,
            document: tempDocument,
          });
          return;
        }
      }

      this.setState({
        ...this.state,
        document,
      });
    }
  };

  this.render = () => {
    $target.appendChild($documentContainer);

    // 루트 url인 경우 노션 컨테이너 렌더링 X
    if (this.state.documentId === null) {
      $target.removeChild($documentContainer);
    }
  };

  const init = async () => {
    await fetchDocuments();
  };

  init();
}
