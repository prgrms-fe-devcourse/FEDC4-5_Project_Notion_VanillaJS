import SideBar from './components/SideBar.js';

export default class App {
  constructor({ $target }) {
    this.$target = $target;
    this.$sideBar = new SideBar({
      $target, initialState: []
    })
  }
}