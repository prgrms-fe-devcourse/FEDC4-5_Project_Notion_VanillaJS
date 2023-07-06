import DocumentList from '@components/ContentWrapper/DirectoryPage/SideBar/DocumentList';
import './style.css';
import { getCurrentDocumentId } from '@global';

export default function Document({ $target, initialState }) {
  const $document = document.createElement('li');
  $document.className = 'Document';
  $target.appendChild($document);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { id, title, documents, isOpen = false } = this.state;
    const currentDocumentId = getCurrentDocumentId();

    const $documentContent = document.createElement('span');
    $documentContent.className = 'DocumentContent';
    $documentContent.style.display = isOpen ? 'block' : 'none';

    if (Array.isArray(documents) && documents.length > 0) {
      new DocumentList({ $target: $documentContent, initialState: documents }).setState(documents);
    } else {
      $documentContent.innerText = '하위 문서가 없습니다. 🤔';
    }

    const displayedTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title;

    $document.innerHTML = `
      <div class="DocumentHeader" data-document-id=${id}>
        <span class="DocumentToggleButton">${isOpen ? '▽' : '►'}</span>
        <h4 class="DocumentTitle">${displayedTitle}</h4>
        <div class="DocumentButtons">
          <span class="DocumentAddButton">➕</span>
          <span class="DocumentDeleteButton">❌</span>
        </div>
      </div>
    `;
    if (currentDocumentId && id === Number(currentDocumentId)) {
      $document.querySelector('.DocumentTitle').classList.add('clicked');
    }

    $document.appendChild($documentContent);
  };
}
