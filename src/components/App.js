import SidebarPage from "./sidebar/SidebarPage";
import store from "../util/Store.js";

export default class App {
  constructor({ $target }) {
    this.$target = $target;

    this.init();
  }

  async init() {
    await store.documentsGet();
    this.render();
  }

  render() {
    new SidebarPage({
      $target: this.$target,
    });
  }
}
