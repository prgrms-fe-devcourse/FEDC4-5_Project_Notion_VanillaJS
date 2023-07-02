import { Component, Router } from '@/core';
import { SideBar } from '@/components/';
import { PostListStore } from '@/store';

export default class App extends Component {
  setup() {
    PostListStore.dispatch({ actionType: 'INIT' });
  }

  templates() {
    return `
    <aside class='sideBar'></aside>
    <section class ='page-Container'></section>
    `;
  }

  mounted() {
    const $sideBar = this.$target.querySelector('.sideBar');
    Component.attach({ constructor: SideBar, $target: $sideBar });
    new Router();
  }
}
