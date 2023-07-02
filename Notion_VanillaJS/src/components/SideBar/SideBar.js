import { Component } from '@/core';
import { PostListStore } from '../../store/PostListStore';
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
    console.log(postList);
    if (!Array.isArray(postList)) return;
    return (
      `<header>Dongja's Notion</header>` +
      this.getPostListTemplate(postList) +
      `<footer>
        <i class="fa-solid fa-plus add"></i>
        새로운 페이지 추가
      </footer>`
    );
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
    <ul class="child-list">
      ${renderPost(documents)}
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

      const id = target.closest('li').dataset.id;
      await PostListStore.dispatch({ actionType: 'DELETE', payload: { id } });
    });
  }
}
