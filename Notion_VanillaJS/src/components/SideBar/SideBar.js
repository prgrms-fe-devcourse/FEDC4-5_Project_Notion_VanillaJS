import { Component, push } from '@/core';
import { PostListStore, PostStore } from '@/store';
import styles from './SideBar.module.css';
import logo from '@/assets/notion.svg';
export default class SideBar extends Component {
  setup() {
    PostListStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
    PostStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
  }

  templates() {
    const postList = PostListStore.getState().postList;
    const postId = PostStore.getState()?.post?.id;
    return `<h1 class='${styles.header} sidebar-header'>
    <img src=${logo} class=${styles.logo} alt='logo'/>
     DongJa's Notion</h1>
      ${
        Array.isArray(postList)
          ? `<ul class=${styles.postList}>
              ${this.getPostListTemplate(postList, postId)}
            </ul>`
          : `<h2>로딩중</h2>`
      }
      <footer class=${styles.footer} data-id=null>
        <button class='${styles.footerButton} add'>
        <i class="fa-solid fa-plus"></i>
        새로운 페이지 추가
        </button>
      </footer>`;
  }

  getPostListTemplate(postList, postId) {
    const hasChildren = (documents) => documents.length !== 0;
    const isSelected = (id) => postId === id;
    return postList
      .map(
        ({ id, title, documents }) => `
    <li data-id=${id} class='parent-list'>
    <div class='${styles.container}  ${isSelected(id) ? styles.active : ''}'>
      <div class=${styles.content}>
        ${
          hasChildren(documents)
            ? `<button class='${styles.dropDown} dropDown'>
            <i class="fa-solid fa-chevron-right"></i>
          </button>`
            : ''
        }
        <h2 class='${styles.title} title'>${
          title
            ? title
            : `<span class=${styles.noneTitle}>제목을 입력하세요<span>`
        }</h2>
      </div>
      <div class=${styles.buttons}>
        <button class ='${styles.delete} delete'>
          <i class="fa-solid fa-minus"></i>
        </button>
        <button class='${styles.add} add'>
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
    ${
      hasChildren(documents)
        ? `
        <ul class=${styles.childList}>
          ${this.getPostListTemplate(documents, postId)}
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
      selector: `.delete`,
      callback: this.onClickDelete,
    });

    this.addEvent({
      eventType: 'click',
      selector: `.add`,
      callback: this.onClickAdd,
    });

    this.addEvent({
      eventType: 'click',
      selector: `.dropDown`,
      callback: this.onClickToggle,
    });

    this.addEvent({
      eventType: 'click',
      selector: `.title`,
      callback: this.onClickLink,
    });

    this.addEvent({
      eventType: 'click',
      selector: `.sidebar-header`,
      callback: () => {
        push('/');
      },
    });
  }

  async onClickDelete({ target }) {
    const deletedId = target.closest('[data-id]').dataset.id;
    await PostListStore.dispatch({
      actionType: 'DELETE_POST_LIST',
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
    await PostListStore.dispatch({ actionType: 'UPDATE_POST_LIST' });
  }

  onClickToggle({ target }) {
    const dropDownButton = target.closest(`.dropDown`);
    const childList = dropDownButton
      .closest('li')
      .querySelector(`.${styles.childList}`);

    if (!childList) return;

    dropDownButton.classList.toggle(`${styles.down}`);
    childList.classList.toggle(`${styles.open}`);
  }

  onClickLink({ target }) {
    const title = target.closest(`.title`);
    const { id } = title.closest('[data-id]').dataset;

    push(`/posts/${id}`);
  }
}
