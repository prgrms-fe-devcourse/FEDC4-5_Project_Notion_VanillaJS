import { push } from '@router';
import request from '@api';
import { setToggledDocuments } from '@storage';
import LOCAL_STORAGE_KEY from '@constants/storage';
import Document from '@components/ContentWrapper/DirectoryPage/SideBar/Document';
import './style.css';

export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement('ul');
  $documentList.className = 'DocumentList';

  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const toggleDocument = (document, documentId) => {
    const { id, documents } = document;
    if (id === Number(documentId)) {
      return { ...document, isOpen: !document.isOpen };
    }

    if (Array.isArray(documents) && documents.length > 0) {
      const updateDocuments = documents.map((childDocument) => toggleDocument(childDocument, documentId));
      return { ...document, documents: updateDocuments };
    }
    return document;
  };

  this.onToggle = (documentId) => {
    const nextState = this.state.map((document) => toggleDocument(document, documentId));
    setToggledDocuments(LOCAL_STORAGE_KEY, nextState);
    this.setState(nextState);
  };

  this.onAdd = async (documentId) => {
    const res = await request('/documents', {
      method: 'POST',
      body: JSON.stringify({ title: '새로운 문서', parent: documentId ? Number(documentId) : null }),
    });
    if (res && res.id) {
      push(`/documents/${res.id}`);
    } else {
      console.error('백엔드 이슈: res 또는 res.id가 없습니다.');
    }
  };

  this.onRemove = async (documentId) => {
    const res = await request(`/documents/${documentId}`, {
      method: 'DELETE',
    });
    if (res.parent && res.parent.id) {
      push(`/documents/${res.parent.id}`);
    } else {
      push('/documents');
    }
  };

  this.render = () => {
    $documentList.innerHTML = '';
    this.state.forEach((doc) => {
      new Document({ $target: $documentList, initialState: doc }).setState(doc);
    });
  };
}
