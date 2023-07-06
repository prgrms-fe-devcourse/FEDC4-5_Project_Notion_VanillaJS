import { setItem, removeItem, getItem } from '../utils/storage.js';
import { SPINNER_ICON } from '../assets/url.js';

export default function PostEditor({ target, initialState, onEdit }) {
  const editorElement = document.createElement('form');

  const loadingElement = document.createElement('div');
  loadingElement.innerHTML = `<img src=${SPINNER_ICON} alt='spinner'/>`;
  loadingElement.setAttribute('class', 'loading');

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;

    const tempPost = getItem(`temp-post-${nextState.id}`);
    if (tempPost) {
      const callPrevData = window.confirm('지난 데이터를 불러오시겠습니까?');
      if (callPrevData) {
        this.state = tempPost;
      } else {
        removeItem(`temp-post-${this.state.id}`);
      }
    }

    this.render();
  };

  let timer = null;

  this.render = () => {
    target.appendChild(editorElement);
    editorElement.innerHTML = `
        <input type='text' name='title' class='post-title'/>
        <textarea name='content' class='post-content'></textarea>
    `;

    editorElement.addEventListener('keyup', e => {
      const { target } = e;

      const name = target.getAttribute('name');

      if (this.state[name] !== undefined) {
        const nextState = {
          ...this.state,
          [name]: target.value,
        };

        setItem(`temp-post-${nextState.id}`, nextState);

        editorElement.appendChild(loadingElement);

        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(async () => {
          await onEdit(nextState.id, {
            title: nextState.title,
            content: nextState.content,
          });

          removeItem(`temp-post-${nextState.id}`);

          if (editorElement.hasChildNodes(loadingElement)) {
            editorElement.removeChild(loadingElement);
          }
        }, 1500);
      }
    });

    if (this.state) {
      const { title, content } = this.state;

      editorElement.querySelector('.post-title').value = title;
      editorElement.querySelector('.post-content').value = content;
      console.log(editorElement.querySelector('.post-title').value);
    }
  };
}
