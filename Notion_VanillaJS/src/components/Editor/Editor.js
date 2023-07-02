import { Component, replace } from '@/core';
import styles from './Editor.module.css';
import { setItem, removeItem } from '../../api/storage';
import { PostStore } from '@/store/PostStore';
import { debounceSaveLocal } from '@/utils/';
import { PostListStore } from '../../store/PostListStore';

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

    console.log(PostStore.getState());
    const { title, content } = PostStore.getState()?.post ?? {
      title: '제목없음',
      content: '내용없음',
    };

    this.$target.querySelector('[name=title]').value = title;
    this.$target.querySelector('[name=content]').value = content;

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
    const id = PostStore.getState().post.id;
    const { name, value } = target;
    await PostStore.dispatch({
      actionType: 'SAVE_POST',
      payload: { [name]: value },
    });
    const postLocalSaveKey = `temp-post-${id}`;
    setItem(postLocalSaveKey, PostStore.getState().post);

    await PostStore.dispatch({ actionType: 'UPDATE_POST' });
    removeItem(postLocalSaveKey);
    PostListStore.dispatch({ actionType: 'INIT' });
  }
}
