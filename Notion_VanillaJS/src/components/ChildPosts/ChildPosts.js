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
      ? `<ul>
      ${childPosts
        .map(
          ({ id, title }) => `
      <li data-id = ${id} class ='child-post'>
        <h2 class='child-post-title'>${
          title
            ? title
            : `<span class=${styles.noneTitle}>제목을 입력하세요<span>`
        }</h2>
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
