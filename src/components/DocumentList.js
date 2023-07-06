import { push } from '../utils/router.js';

export default function DocumentList({ $target, initialState, onToggle, onCreate, onDelete }) {
  const $documentList = document.createElement('div');
  $documentList.classList.add('document-list');
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocuments = (documents, depth) => {
    return `
      ${
        documents.length > 0
          ? documents
              .map((document) => {
                const isExpanded = this.state.openedDocuments.indexOf(document.id) > -1;
                return `
                  <li data-id="${document.id}" class="document-list-item">
                    <div class="document-item ${document.id === this.state.documentId ? 'selected' : ''}" 
                          style="padding:2px 10px 2px ${depth * 14 + 5}px;">
                      <button class="toggle-button ${isExpanded ? 'expanded' : ''}"></button>
                      <div class="document-title">
                        ${document.title.length === 0 ? '제목 없음' : document.title}
                      </div>
                      <div class="document-button-wrapper">
                        <div>
                          <button class="delete-button"></button>
                          <button class="add-button"></button>
                        </div>
                      </div>
                    </div>
                    <ul class="${isExpanded ? 'expanded' : ''}">
                      ${renderDocuments(document.documents, depth + 1)}
                    </ul>
                  </li>`;
              })
              .join('')
          : `
            <li class="document-list-none" style="padding:2px 10px 2px ${depth * 14 + 15}px;">
              하위 페이지 없음
            </li>
          `
      }
    `;
  };

  this.render = () => {
    $documentList.innerHTML = `
      ${this.state.documents.length > 0 ? `<ul class="expanded">${renderDocuments(this.state.documents, 0)}</ul>` : ''}
    `;
  };

  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('.document-list-item');

    if ($li) {
      const { id } = $li.dataset;
      const [className] = e.target.classList;

      if (className === 'toggle-button') {
        onToggle(parseInt(id), $li.querySelector('ul'));
      } else if (className === 'add-button') {
        onCreate(parseInt(id));
      } else if (className === 'delete-button') {
        onDelete(parseInt(id));
      } else if (className === 'document-item-none') {
        return;
      } else {
        push(`/documents/${id}`);
      }
    }
  });

  this.render();
}
