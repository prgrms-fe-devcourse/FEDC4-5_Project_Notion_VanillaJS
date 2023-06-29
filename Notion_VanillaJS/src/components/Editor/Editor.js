import { Component } from '@/core';
import styles from './Editor.module.css';
import { setItem } from '../../api/storage';

export default class Editor extends Component {
  setup() {
    this.state.isInit = false;
    this.setState({ post: { postId: '1', title: '', content: '' } });
  }

  templates() {
    return `
      <input type='text' name='title' class='${styles.title}'/>
      <textarea name='content' class='${styles.content}'></textarea>
    `;
  }

  render() {
    const { isInit, post } = this.state;
    const { title, content } = post;

    //초기화 안됐을 때
    if (!isInit) {
      this.$target.innerHTML = this.templates();
      this.setState({ isInit: true });
      return;
    }

    this.$target.querySelector('[name=title]').value = title;
    this.$target.querySelector('[name=content]').value = content;

    this.mounted();
  }

  setEvent() {
    this.addEvent({
      eventType: 'keyup',
      selector: '[name]',
      callback: ({ target }) => {
        const { name, value } = target;
        this.setState({ post: { ...this.state.post, [name]: value } });

        const postLocalSaveKey = `temp-post-${this.state.postId}`;
        setItem(postLocalSaveKey, this.state.post);
      },
    });
  }
}
