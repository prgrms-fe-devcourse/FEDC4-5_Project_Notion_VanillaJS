import { push } from '../../domain/router';
import { validateArray, validateComponent } from '../../utils/validation';

const CONFIRM_DELETE_DOCUMENT = '해당 문서를 삭제하시겠습니까?';

export default function SidebarDocumentTree({ $target, initialState, addDocument, deleteDocument }) {
  validateComponent(new.target);

  const $sidebarDocumentTree = document.createElement('div');
  $sidebarDocumentTree.classList.add('sidebar-document__tree');
  $target.appendChild($sidebarDocumentTree);

  validateArray(initialState);
  this.state = initialState;

  this.setState = (nextState) => {
    validateArray(nextState);
    this.state = nextState;
    this.render();
  };

  const drawSidebarDocumentTree = (tree) => {
    return `
      <ul>
      ${tree
        .map(
          ({ id, title, documents }) => `
      <div class='documents-tree'>
        <li data-id="${id}">
          ▶️📄${title}
          <button class="add-button"> + </button>
          <button class="delete-button"> - </button>
        </li>
        ${documents.map((document) => drawSidebarDocumentTree([document])).join('')}
      </div>
      `,
        )
        .join('')}
      </ul>
      `;
  };

  this.render = () => {
    const documentsTree = drawSidebarDocumentTree(this.state);
    const documentAddButton = `<button class="add-button">+ 페이지 추가하기</button>`;
    $sidebarDocumentTree.innerHTML = `
      <div class="tree"><div class="outer-ul">${documentsTree}</div>${documentAddButton}</div>
    `;
  };

  this.render();

  $sidebarDocumentTree.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    const $button = e.target.closest('button');
    const id = $li?.dataset.id;
    if ($li) {
      push(`/documents/${id}`);
    }
    if ($button) {
      const buttonClassName = $button.className;
      if (buttonClassName === 'delete-button') {
        if (confirm(`${CONFIRM_DELETE_DOCUMENT}`)) {
          deleteDocument(id);
          return;
        }
      } else if (buttonClassName === 'add-button') {
        addDocument(id, buttonClassName);
        return;
      }
    }
  });
}
