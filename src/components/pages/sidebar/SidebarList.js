import { onRemoveDocument } from '../../../apis/api.js';

export default function SidebarList({
  $target,
  initialState,
  onSelect,
  onCreateDocument,
}) {
  const $list = document.createElement('div');
  $list.className = 'list-container';
  $target.appendChild($list);

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const documentList = createList(this.state, '');
    $list.innerHTML = `${documentList}`;
  };

  const createList = (data, inner) => {
    if (data.length !== 0) {
      inner += `
        <ul class="list-wrap">
          ${data
            .map(({ id, title, documents }) => {
              const haveChildNode = documents.length > 0 && documents;
              return `
                  <div class="list-wrap-div">
                    <li class="list-item" data-id="${id}" style="list-style: none; color: #9a9a9a;">
                      <i class="fa-solid fa-chevron-right fa-2xs" style="color: #9a9a9a;"></i>
                      <i class="fa-regular fa-file fa-xs" style="color: #9a9a9a; margin-left: 3px"></i>
                      <span class="title">${title || '제목없음'}</span>
                      <i class="create fa-solid fa-plus fa-xs" style="display: inline-block color: #9a9a9a;"></i>
                      <i class="remove fa-solid fa-trash fa-xs" style="display: inline-block color: #9a9a9a;"></i>
                    </li>  
                  </div>              
                    ${
                      haveChildNode
                        ? documents
                            .map((document) => createList([document], inner))
                            .join('')
                        : ''
                    }
                  `;
            })
            .join('')}
        </ul>
      `;
      return inner;
    } else {
      return (inner = '');
    }
  };

  $list.addEventListener('click', (e) => {
    const { target } = e;
    const $li = e.target.closest('li');

    if ($li) {
      const { id } = $li.dataset;
      if (target.classList.contains('remove')) {
        if (confirm(`삭제할까요?`)) {
          onRemoveDocument(id);
        }
      } else if (target.classList.contains('create')) onCreateDocument(id);
      else {
        onSelect(id);
      }
    }
  });
}
