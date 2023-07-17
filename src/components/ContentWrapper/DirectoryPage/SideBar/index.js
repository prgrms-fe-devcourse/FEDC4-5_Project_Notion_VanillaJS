import DocumentList from '@components/ContentWrapper/DirectoryPage/SideBar/DocumentList';
import request from '@api';
import { getToggledDocuments } from '@storage';
import LOCAL_STORAGE_KEY from '@constants/storage';
import { push } from '@router';
import './style.css';

export default function SideBar({ $target, initialState = [] }) {
  const $sideBar = document.createElement('aside');
  $sideBar.className = 'SideBar';

  const $documentListNav = document.createElement('nav');
  $documentListNav.className = 'DocumentListNav';

  $sideBar.appendChild($documentListNav);
  $target.appendChild($sideBar);

  this.state = {
    documents: initialState,
  };

  const documentList = new DocumentList({
    $target: $documentListNav,
    initialState: this.state.documents,
  });

  this.setState = async (nextState) => {
    if (nextState && nextState.isVisible) {
      this.state = { ...this.state, ...nextState };
    }

    const documents = await request('/documents');
    this.state.documents = getToggledDocuments(LOCAL_STORAGE_KEY, documents);

    if (this.state.documents !== undefined) {
      documentList.setState(this.state.documents);
    }
  };

  const handleDocumentTitleClick = (target) => {
    const allDocumentTitles = document.querySelectorAll('.DocumentTitle');
    allDocumentTitles.forEach((documentTitle) => {
      documentTitle.classList.remove('clicked');
    });
    target.classList.add('clicked');
  };

  const handleDocumentAddButtonClick = (documentId) => {
    documentList.onAdd(documentId);
  };

  const handleDocumentToggleButtonClick = (documentId) => {
    documentList.onToggle(documentId);
  };

  const handleDocumentDeleteButtonClick = (documentId) => {
    documentList.onRemove(documentId);
  };

  $sideBar.addEventListener('click', ({ target }) => {
    const $documentHeader = target.closest('.DocumentHeader');
    if (!$documentHeader) return;

    const { documentId } = $documentHeader.dataset;

    if (target.classList.contains('DocumentTitle')) {
      handleDocumentTitleClick(target);
    }

    const $documentAddButton = target.closest('.DocumentAddButton');
    const $documentToggleButton = target.closest('.DocumentToggleButton');
    const $documentDeleteButton = target.closest('.DocumentDeleteButton');

    if ($documentAddButton) {
      handleDocumentAddButtonClick(documentId);
    } else if ($documentToggleButton) {
      handleDocumentToggleButtonClick(documentId);
    } else if ($documentDeleteButton) {
      handleDocumentDeleteButtonClick(documentId);
    } else {
      push(`/documents/${documentId}`);
    }
  });
}
