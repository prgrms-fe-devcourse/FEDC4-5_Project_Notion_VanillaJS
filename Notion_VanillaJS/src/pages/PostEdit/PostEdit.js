import { Component } from '@/core';
import Editor from '../../components/Editor/Editor';

export default class PostEdit extends Component {
  templates() {
    return `<section class='Editor'>postEdit</section>`;
  }

  mounted() {
    const $editor = this.$target.querySelector('.Editor');
    Component.attach({ constructor: Editor, $target: $editor });
  }
}
