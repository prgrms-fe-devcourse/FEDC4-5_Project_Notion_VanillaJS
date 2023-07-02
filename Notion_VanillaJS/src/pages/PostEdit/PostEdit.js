import { Component } from '@/core';
import { Editor } from '@/components';
import styles from './PostEdit.module.css';
import { PostStore } from '@/store';

export default class PostEdit extends Component {
  async setup() {
    const [, , id] = location.pathname.split('/');
    await PostStore.dispatch({ actionType: 'GET_POST', payload: { id } });
  }

  templates() {
    return `<section class='${styles.Editor} Editor'>postEdit</section>`;
  }

  mounted() {
    const $editor = this.$target.querySelector('.Editor');
    Component.attach({
      constructor: Editor,
      $target: $editor,
    });
  }
}
