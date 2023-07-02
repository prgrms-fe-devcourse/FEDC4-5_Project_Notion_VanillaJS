import { Component, push } from '@/core';
import { PostListStore } from '../../store/PostListStore';
import { PostStore } from '../../store/PostStore';
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
    return `<header>Dongja's Notion</header>
      ${
        Array.isArray(postList)
          ? this.getPostListTemplate(postList)
          : `<h2>로딩중</h2>`
      }
      <footer data-id=null>
        <i class="fa-solid fa-plus add"></i>
        새로운 페이지 추가
      </footer>`;
  }

  getPostListTemplate(postList) {
    return postList
      .map(
        ({ id, title, documents }) => `
    <li data-id=${id} class="parent-list">
    <div class=${styles.container}>
      <div class=${styles.content}>
        <i class="fa-solid fa-angle-right"></i>
        <h3 class="title" >${title}</h3>
      </div>
      <div class="buttons">
        <i class="fa-solid fa-minus delete"></i>
        <i class="fa-solid fa-plus add"></i>
      </div>
    </div>
    ${
      documents.length === 0
        ? ''
        : `
    <ul class=${styles.childList}>
      ${this.getPostListTemplate(documents)}
    </ul>
    `
    }
    </li>`
      )
      .join('');
  }

  setEvent() {
    this.$target.addEventListener('click', async ({ target }) => {
      const deleteButton = target?.closest('.delete');

      if (!deleteButton) return;

      const deletedId = target.closest('li').dataset.id;
      await PostListStore.dispatch({
        actionType: 'DELETE',
        payload: { id: deletedId },
      });
      const nowId = PostStore.getState()?.post?.id;
      if (parseInt(deletedId) === nowId) push('/');
    });

    this.$target.addEventListener('click', async ({ target }) => {
      const addButton = target?.closest('.add');

      if (!addButton) return;

      const id = target.closest(`[data-id]`).dataset.id;
      await PostStore.dispatch({
        actionType: 'CREATE_POST',
        payload: { parent: id },
      });
      await PostListStore.dispatch({ actionType: 'INIT' });
    });
  }
}
