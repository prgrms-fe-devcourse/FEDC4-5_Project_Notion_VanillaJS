import { push } from '../../domain/router';
import { validateArray, validateComponent } from '../../utils/validation';

export default function MainDocumentTree({ $target, initialState }) {
  validateComponent(new.target);

  const $mainDocumentTree = document.createElement('div');
  $mainDocumentTree.classList.add('main-document__area');
  $target.appendChild($mainDocumentTree);

  validateArray(initialState);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = [nextState];
    this.render();
  };

  const mainDocumentTree = (tree) => {
    return `
    <ul>
      ${tree
        .map(
          ({ id, title, documents }) => `
        <div class="main-documents">
          <li class="main-document" data-id="${id}">▶️${title}</li>
          ${documents.map((document) => mainDocumentTree([document])).join('')}
        </div>
      `,
        )
        .join('')}
    </ul>
    `;
  };

  this.render = () => {
    const documentsTree = mainDocumentTree(this.state);
    $mainDocumentTree.innerHTML = `<div class="main-documents__tree">${documentsTree}</div>`;
  };

  this.render();

  $mainDocumentTree.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const { id } = $li.dataset;
      const currentDocumentId = window.location.pathname.split('/')[2];
      if (id === currentDocumentId) {
        window.history.back();
      } else {
        push(`/documents/${id}`);
      }
    }
  });
}
