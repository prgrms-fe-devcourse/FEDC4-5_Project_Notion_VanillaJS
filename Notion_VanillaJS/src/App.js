import { Component, Router } from '@/core';
import { SideBar } from '@/pages/';

export default class App extends Component {
  setup() {}

  templates() {
    return `
    <header>Notion</header>
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
