import { Component, push } from '@/core';
import { PostListStore, PostStore } from '@/store';
import styles from './SideBar.module.css';

export default class SideBar extends Component {
  setup() {
    PostListStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
  }

  templates() {
    const postList = PostListStore.getState().postList;
    return `<h1>Dongja's Notion</h1>
      ${
        Array.isArray(postList)
          ? this.getPostListTemplate(postList)
          : `<h2>로딩중</h2>`
      }
      <footer class=${styles.footer} data-id=null>
        <button class='add'>
        <i class="fa-solid fa-plus"></i>
        새로운 페이지 추가
        </button>
      </footer>`;
  }

  getPostListTemplate(postList) {
    const hasChildren = (documents) => documents.length !== 0;
    return postList
      .map(
        ({ id, title, documents }) => `
    <li data-id=${id} class="parent-list">
    <div class=${styles.container}>
      <div class=${styles.content}>
        ${
          hasChildren(documents)
            ? `<button class=${styles.dropDown}>
            <i class="fa-solid fa-caret-right"></i>
          </button>`
            : ''
        }
        <h2 class=${styles.title} >${title}</h2>
      </div>
      <div class=${styles.buttons}>
        <button class ='delete'>
          <i class="fa-solid fa-minus"></i>
        </button>
        <button class='add'>
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
    ${
      hasChildren(documents)
        ? `
        <ul class=${styles.childList}>
          ${this.getPostListTemplate(documents)}
        </ul>
        `
        : ''
    }
    </li>`
      )
      .join('');
  }

  setEvent() {
    this.addEvent({
      eventType: 'click',
      selector: '.delete',
      callback: this.onClickDelete,
    });

    this.addEvent({
      eventType: 'click',
      selector: '.add',
      callback: this.onClickAdd,
    });

    this.addEvent({
      eventType: 'click',
      selector: `.${styles.dropDown}`,
      callback: this.onClickToggle,
    });

    this.addEvent({
      eventType: 'click',
      selector: `.${styles.title}`,
      callback: this.onClickLink,
    });
  }

  async onClickDelete({ target }) {
    const deletedId = target.closest('[data-id]').dataset.id;
    await PostListStore.dispatch({
      actionType: 'DELETE',
      payload: { id: deletedId },
    });
    const nowId = PostStore.getState()?.post?.id;
    if (parseInt(deletedId) === nowId) push('/');
  }

  async onClickAdd({ target }) {
    const id = target.closest(`[data-id]`).dataset.id;
    await PostStore.dispatch({
      actionType: 'CREATE_POST',
      payload: { parent: id },
    });
    await PostListStore.dispatch({ actionType: 'INIT' });
  }

  onClickToggle({ target }) {
    const dropDownButton = target.closest(`.${styles.dropDown}`);
    const childList = dropDownButton
      .closest('li')
      .querySelector(`.${styles.childList}`);

    if (!childList) return;

    dropDownButton.classList.toggle(`${styles.down}`);
    childList.classList.toggle(`${styles.open}`);
  }

  onClickLink({ target }) {
    const title = target.closest(`.${styles.title}`);
    const { id } = title.closest('[data-id]').dataset;

    push(`/posts/${id}`);
  }
}
