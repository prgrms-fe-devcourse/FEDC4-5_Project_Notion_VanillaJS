import { Component, push } from '@/core';
import Editor from '../../components/Editor/Editor';
import styles from './PostEdit.module.css';

export default class PostEdit extends Component {
  templates() {
    return `<section class='${styles.Editor} Editor'>postEdit</section>`;
  }

  mounted() {
    const $editor = this.$target.querySelector('.Editor');
    Component.attach({ constructor: Editor, $target: $editor });
  }
}
