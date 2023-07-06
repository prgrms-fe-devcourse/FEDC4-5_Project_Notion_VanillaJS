import { pushRoute } from '../utils/router.js';

export default function PostList({
  target,
  initialState,
  onClickAddButton,
  onClickDeleteButton,
}) {
  const postListElement = document.createElement('div');

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const buildNestedList = (post, show) => {
    const hasChild = Boolean(post.documents.length);

    return `
          <ul id=${post.id} style='display:${show ? 'block' : 'none'}'>  
            <li data-id="${post.id}" >
            ${
              hasChild
                ? `<button type="button" name="toggle">
                  <i class="bi bi-caret-right"></i>
                </button>`
                : ''
            }
              <span>${post.title}</span>
              <button type='button' name='delete'><i class="bi bi-trash-fill"></i></button>
              <button type='button' name='add'><i class="bi bi-plus-square"></i></button>
            </li> 
            ${
              hasChild
                ? post.documents
                    .map(list => buildNestedList(list, false))
                    .join('')
                : ''
            } 
          </ul>
        `;
  };
  target.appendChild(postListElement);

  this.render = () => {
    // 로딩 : this.state가 undefined인 경우
    //문서가 아예없을 때
    postListElement.innerHTML = `
       ${this.state.list
         .map(document => buildNestedList(document, true))
         .join('')}
         <button type="button" name='add' class='createNew'><i class="bi bi-plus-square"></i> 새 문서 추가</button>
    `;

    if (this.state.currentId !== null) {
      const currentUlElement = document.getElementById(this.state.currentId);
      documentListStyling(currentUlElement);
    }

    const spanElements = [...postListElement.querySelectorAll('li>span')];

    spanElements.forEach(spanElement => {
      spanElement.addEventListener('click', async e => {
        const closestLi = e.target.closest('li');
        const { id } = closestLi.dataset;

        pushRoute(`/documents/${id}`);
      });
    });

    const buttons = [...postListElement.querySelectorAll('button')];

    buttons.forEach(buttonElement => {
      const buttonType = buttonElement.getAttribute('name');
      if (buttonType === 'add') {
        buttonElement.addEventListener('click', e => {
          const closestLi = e.target.closest('li');
          if (closestLi) {
            const { id } = closestLi.dataset;
            onClickAddButton(id);
          } else {
            onClickAddButton(null); // root에 추가
          }
        });
      } else if (buttonType === 'delete') {
        buttonElement.addEventListener('click', e => {
          const closestLi = e.target.closest('li');
          const { id } = closestLi.dataset;

          onClickDeleteButton(id);
        });
      } else if (buttonType === 'toggle') {
        buttonElement.addEventListener('click', e => {
          const closestUl = e.target.closest('ul');
          const id = closestUl.id * 1;

          const clickedElement = document.getElementById(id);

          for (const child of clickedElement.childNodes) {
            if (child.id) {
              const toggled = child.style.display === 'block';

              child.style.display = toggled ? 'none' : 'block';

              if (e.target.closest('button') !== null) {
                e.target.closest('button').innerHTML = toggled
                  ? '<i class="bi bi-caret-right"></i>'
                  : '<i class="bi bi-caret-down"></i>';
              }
            }
          }
        });
      }
    });
  };

  const isTagUL = element => element.tagName === 'UL';

  const documentListStyling = element => {
    if (element === null) {
      return;
    }

    const parent = element.parentNode;

    if (!parent) {
      return;
    }

    if (parent.hasChildNodes()) {
      for (const sibling of parent.childNodes) {
        if (isTagUL(sibling)) {
          sibling.style.display = 'block';
        }
      }
    }

    if (isTagUL(parent)) {
      parent.style.display = 'block';
    }

    if (isTagUL(parent)) {
      const upperToggleButton = parent.querySelector('button[name=toggle]');

      if (upperToggleButton) {
        upperToggleButton.innerHTML = '<i class="bi bi-caret-down"></i>';
      }
    }

    documentListStyling(parent);
  };
}
