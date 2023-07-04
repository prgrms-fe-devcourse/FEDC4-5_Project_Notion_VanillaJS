import { Component } from '@/core';
import styles from './Editor.module.css';
import { setItem, removeItem } from '@/api/storage';
import { PostStore, PostListStore } from '@/store/';
import { debounceSaveLocal } from '@/utils/';

export default class Editor extends Component {
  setup() {
    PostStore.subscribe({
      listenerKey: this.constructor.name,
      listener: this.render.bind(this),
    });
    this.state.isInit = false;
  }

  templates() {
    return `
      <input type='text' name='title' class='${styles.title}' placeholder='제목을 입력하세요'/>
      <div name='content' class='${styles.content}' placeholder='내용을 입력하세요' contenteditable></div>
    `;
  }

  render() {
    const { isInit } = this.state;

    //초기화 안됐을 때
    if (!isInit) {
      this.$target.innerHTML = this.templates();
      this.setState({ isInit: true });
      return;
    }

    const { title, content } = PostStore.getState()?.post ?? {
      title: '로딩 중',
      content: '로딩 중',
    };

    this.$target.querySelector('[name=title]').value = title;
    const $content = this.$target.querySelector('[name=content]');
    $content.innerHTML = content.replace('\n', '<br>');
    this.focusLastChar($content);
    this.mounted();
  }

  setEvent() {
    this.addEvent({
      eventType: 'keyup',
      selector: '[name=title]',
      callback: debounceSaveLocal(({ target }) => this.saveTitle(target)),
    });
    this.addEvent({
      eventType: 'keyup',
      selector: '[name=content]',
      callback: debounceSaveLocal(({ target }) => this.saveContent(target)),
    });
  }

  async saveTitle(target) {
    const { value } = target;
    await PostStore.dispatch({
      actionType: 'SAVE_POST',
      payload: { title: value },
    });

    const id = PostStore.getState().post.id;
    const postLocalSaveKey = `temp-post-${id}`;

    setItem(postLocalSaveKey, PostStore.getState().post);
    await PostStore.dispatch({ actionType: 'UPDATE_POST' });
    removeItem(postLocalSaveKey);
    PostListStore.dispatch({ actionType: 'UPDATE_POST_LIST' });
  }

  async saveContent(target) {
    const { innerHTML } = target;
    await PostStore.dispatch({
      actionType: 'SAVE_POST',
      payload: { content: innerHTML },
    });

    const id = PostStore.getState().post.id;
    const postLocalSaveKey = `temp-post-${id}`;

    setItem(postLocalSaveKey, PostStore.getState().post);
    await PostStore.dispatch({ actionType: 'UPDATE_POST' });
    removeItem(postLocalSaveKey);
  }

  /**
   *
   * @param {HTMLElement} $content
   * 1. range와 selection 객체를 가져온다
   */
  focusLastChar($content) {
    const range = document.createRange();
    const selection = getSelection();

    range.selectNodeContents($content);
    range.collapse();
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
