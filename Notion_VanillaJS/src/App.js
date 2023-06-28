import { Component } from '@/core';
import { SideBar, MainContent } from '@/pages/';

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
    this.attach({ constructor: SideBar, $target: $sideBar });
    const $pageContainer = this.$target.querySelector('.page-Container');
    this.attach({ constructor: MainContent, $target: $pageContainer });
  }
}
