import DocumentList from '@components/ContentWrapper/DirectoryPage/SideBar/DocumentList';
import request from '@api';
import { getDocuments } from '@storage';
import LOCAL_STORAGE_KEY from '@constants/storage';
import { setCurrentDocumentId } from '@global';
import { push } from '@router';
import './style.css';

export default function SideBar({ $target, initialState = [] }) {
  const $sideBar = document.createElement('aside');
  $sideBar.className = 'SideBar';

  const $documentListNav = document.createElement('nav');
  $documentListNav.className = 'DocumentListNav';

  $sideBar.appendChild($documentListNav);
  $target.appendChild($sideBar);

  this.state = initialState;

  // 사이드바 열기
  this.show = () => {
    $sideBar.style.display = 'block';
  };

  // 사이드바 닫기
  this.hide = () => {
    $sideBar.style.display = 'none';
  };

  const documentList = new DocumentList({
    $target: $documentListNav,
    initialState: this.state,
  });

  this.setState = async () => {
    this.state = await request('/documents');
    this.state = getDocuments(LOCAL_STORAGE_KEY, this.state);
    if (this.state !== undefined) {
      documentList.setState(this.state);
    }
  };

  const handleDocumentTitleClick = (target) => {
    const allDocumentTitles = document.querySelectorAll('.DocumentTitle');
    allDocumentTitles.forEach((documentTitle) => {
      documentTitle.classList.remove('clicked');
    });
    target.classList.add('clicked');

    const { documentId } = target.closest('.DocumentHeader').dataset;
    setCurrentDocumentId(documentId);
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
