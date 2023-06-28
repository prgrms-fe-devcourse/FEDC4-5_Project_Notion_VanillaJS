import Component from '@/core/Component';
import { Home, PostEdit } from '../../components';

export default class MainContent extends Component {
  templates() {
    return `
    <section class='home'></section>
    <section class='postEdit'></section>
    `;
  }

  mounted() {
    const $home = this.$target.querySelector('.home');
    this.attach({ constructor: Home, $target: $home });
    const $postEdit = this.$target.querySelector('.postEdit');
    this.attach({ constructor: PostEdit, $target: $postEdit });
  }
}
