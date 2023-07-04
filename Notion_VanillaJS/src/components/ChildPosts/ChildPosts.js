import { Component, push } from '@/core';
import { PostStore } from '@/store';
import styles from './ChildPosts.module.css';
export default class ChildPosts extends Component {
  setup() {
    PostStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
  }

  templates() {
    const childPosts = PostStore.getState()?.post?.documents;
    return childPosts
      ? `<ul class='${styles.childList}'>
      ${childPosts
        .map(
          ({ id, title }) => `
      <li data-id = ${id} class ='item ${styles.item}'>
        <h3 class='item-title ${styles.itemTitle}'>
        ${
          title
            ? ` <i class="fa-regular fa-file-lines"></i> ${title}`
            : `<span class=${styles.noneTitle}><i class="fa-regular fa-file"></i> 제목을 입력하세요<span>`
        }</h3>
      </li>`
        )
        .join('')}
    </ul>`
      : '';
  }

  setEvent() {
    this.addEvent({
      eventType: 'click',
      selector: '[data-id]',
      callback: this.onClickChild,
    });
  }

  onClickChild({ target }) {
    const { id } = target.closest('[data-id]').dataset;
    push(`/posts/${id}`);
  }
}
