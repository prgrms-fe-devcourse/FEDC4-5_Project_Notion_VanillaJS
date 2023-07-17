import { Component, push } from '@/core';
import styles from './PostEditHeader.module.css';
import { PostListStore, PostStore } from '@/store';
import PathFinder from './PathFinder';
export default class PostEditHeader extends Component {
  setup() {
    PostStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
    PostListStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
    this.pathFinder = new PathFinder();
  }

  templates() {
    const postList = PostListStore.getState()?.postList;
    const post = PostStore.getState()?.post;

    const isPostListLoading = postList == null;
    const isPostLoading = post == null;

    const isContentLoading = [isPostListLoading, isPostLoading].some(
      (loading) => loading
    );

    return `${
      isContentLoading
        ? '<h1>로딩 중</h1>'
        : `<ul class=${styles.breadCrumb}>${this.pathFinder
            .searchPath(postList, post)
            ?.map(
              ({ title, id }) =>
                `<li class = ${styles.item} data-id=${id}>${
                  title
                    ? title
                    : `
                  <span class=${styles.noneTitle}>
                  제목을 입력하세요
                  <span>`
                }</li>`
            )
            .join('/')}</ul>`
    }`;
  }

  setEvent() {
    this.addEvent({
      eventType: 'click',
      selector: '[data-id]',
      callback: ({ target }) => {
        const { id } = target.closest('[data-id]').dataset;
        push(`/documents/${id}`);
      },
    });
  }
}
