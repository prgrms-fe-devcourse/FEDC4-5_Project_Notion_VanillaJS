import { Component, push } from '@/core';
import styles from './PostEditHeader.module.css';
import { PostListStore, PostStore } from '@/store';

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
        : `<ul class=${styles.breadCrumb}>${this.searchPath(postList, post)
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

  searchPath(postList, targetPost) {
    let path;
    postList.forEach((post) => {
      const tmpPath = this.findPath(post, targetPost.id);
      if (tmpPath) path = tmpPath;
    });
    return path;
  }

  findPath(currentDocument, targetId, path = []) {
    if (currentDocument.id === targetId) {
      return [
        ...path,
        { title: currentDocument.title, id: currentDocument.id },
      ];
    }

    for (const document of currentDocument.documents) {
      const childPath = this.findPath(document, targetId, [
        ...path,
        { title: currentDocument.title, id: currentDocument.id },
      ]);
      if (childPath) {
        return childPath;
      }
    }
    return null;
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
