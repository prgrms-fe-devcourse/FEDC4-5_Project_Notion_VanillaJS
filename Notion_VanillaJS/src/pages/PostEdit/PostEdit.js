import { Component } from '@/core';
import { Editor, ChildPosts } from '@/components';
import styles from './PostEdit.module.css';
import { PostStore } from '@/store';

export default class PostEdit extends Component {
  async setup() {
    const [, , id] = location.pathname.split('/');
    await PostStore.dispatch({ actionType: 'GET_POST', payload: { id } });
  }

  templates() {
    return `<section class='${styles.Editor} Editor'>postEdit</section>
            <footer class='child-posts ${styles.footer}'><footer>`;
  }

  mounted() {
    const $editor = this.$target.querySelector('.Editor');
    Component.attach({
      constructor: Editor,
      $target: $editor,
    });
    const $childPosts = this.$target.querySelector('.child-posts');
    Component.attach({
      constructor: ChildPosts,
      $target: $childPosts,
    });
  }
}
