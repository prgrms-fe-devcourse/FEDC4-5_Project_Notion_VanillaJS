import { push } from '../utils/router.js';

export default function DocumentList({ $target, initialState, onToggle, onCreate, onDelete }) {
  const $documentList = document.createElement('div');
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

                  return `<li data-id="${document.id}" class="document-item">
                      <div class="document-item-container ${document.id === this.state.documentId ? 'selected' : ''}" 
                            style="display:flex; justify-content:space-between; padding:1px 2px 1px ${depth * 20}px;">
                        <button class="toggle-button ${isExpanded ? 'expanded' : ''}">></button>
                        ${document.title.length === 0 ? '제목 없음' : document.title}
                        <div>
                          <button class="delete-button">-</button>
                          <button class="create-button">+</button>
                        </div>
                      </div>
                      <ul class="${isExpanded ? 'expanded' : ''}">
                        ${renderDocuments(document.documents, depth + 1)}
                      </ul>
                    </li>`;
                })
                .join('')
            : `<li class="document-item-none" style="padding:1px 2px 1px ${depth * 20}px;">하위 페이지 없음</li>`
        }
    `;
  };

  this.render = () => {
    $documentList.innerHTML = `
      <ul class="expanded">
        ${renderDocuments(this.state.documents, 0)}
      </ul>
    `;
  };

  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('.document-item');

    if ($li) {
      const { id } = $li.dataset;
      const [className] = e.target.classList;

      if (className === 'toggle-button') {
        onToggle(parseInt(id), $li.querySelector('ul'));
      } else if (className === 'create-button') {
        onCreate(parseInt(id));
      } else if (className === 'delete-button') {
        onDelete(parseInt(id));
      } else if (className === 'document-item-container') {
        push(`/documents/${id}`);
      }
    }
  });

  this.render();
}
