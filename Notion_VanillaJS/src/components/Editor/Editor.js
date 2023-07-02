import { Component, replace } from '@/core';
import styles from './Editor.module.css';
import { setItem, removeItem } from '../../api/storage';
import { PostStore } from '@/store/PostStore';
import { debounceSaveLocal } from '@/utils/';

export default class Editor extends Component {
  setup() {
    // PostStore.subscribe({
    //   listenerKey: this.constructor.name,
    //   listenerKey: this.render.bind(this),
    // });
    this.state.isInit = false;
  }

  templates() {
    return `
      <input type='text' name='title' class='${styles.title}'/>
      <textarea name='content' class='${styles.content}'></textarea>
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

    const post = PostStore.getState()?.post;

    this.$target.querySelector('[name=title]').value = post?.title;
    this.$target.querySelector('[name=content]').value = post?.content;

    this.mounted();
  }

  setEvent() {
    this.addEvent({
      eventType: 'keyup',
      selector: '[name]',
      callback: debounceSaveLocal(({ target }) => this.saveLocal(target)),
    });
  }

  async saveLocal(target) {
    const { id } = this.props;
    const { name, value } = target;
    await PostStore.dispatch({
      actionType: 'SAVE_POST',
      payload: { [name]: value },
    });
    // this.setState({ post: { ...this.state.post, [name]: value } });
    const postLocalSaveKey = `temp-post-${id}`;
    setItem(postLocalSaveKey, PostStore.getState().post);
    this.onEditing();
  }

  async onEditing() {
    const { id } = this.props;
    const isNew = id === 'new';
    if (isNew) {
      const postLocalSaveKey = `temp-post-${id}`;
      await PostStore.dispatch({ actionType: 'CREATE_POST' });
      removeItem(postLocalSaveKey);
      replace(`/posts/${PostStore.getState().post.id}`);
      return;
    }
  }
}
