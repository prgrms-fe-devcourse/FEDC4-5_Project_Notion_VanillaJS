import { request } from '../api/request.js';
import { pushRoute } from '../router.js';
export default function PostList({
  target,
  initialState,
  onClickPost,
  onClickAddButton,
  onClickDeleteButton,
}) {
  const postListElement = document.createElement('div');

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const DFS = post => {
    return `
          <ul>  
            <li data-id="${post.id}">
              <span>${post.title}</span>
              <button type='button' name='add'>+</button>
              <button type='button' name='delete'>-</button>
            </li> 
            ${
              post.documents.length
                ? post.documents.map(list => DFS(list)).join('')
                : ''
            } 
          </ul>
        `;
  };
  this.render = () => {
    target.appendChild(postListElement);
    // 로딩 : this.state가 undefined인 경우
    //문서가 아예없을 때
    postListElement.innerHTML = `
       <button type="button" name='add'>+</button>
       ${this.state.map(document => DFS(document)).join('')}
    `;
    // ${
    //   this.state.length === 0 &&
    //   `<button type="button" name='add'>+</button>`
    // }

    const spanElements = [...postListElement.querySelectorAll('li>span')];
    spanElements.forEach(spanElement => {
      spanElement.addEventListener('click', e => {
        // const ulElem = e.target.closest('li');

        const closestLi = e.target.closest('li');
        const { id } = closestLi.dataset;
        onClickPost(id);
        // if (ulElem) {
        //   const { id } = ulElem.dataset;
        //   console.log(ulElem, id);
        //   onClickPost(id);
        // } else {
        //   onClickPost(null);
        // }
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
            onClickAddButton(null);
          }
        });
      } else if (buttonType === 'delete') {
        buttonElement.addEventListener('click', e => {
          const closestLi = e.target.closest('li');
          const { id } = closestLi.dataset;

          onClickDeleteButton(id);
        });
      }
    });
  };

  // this.render();
}
