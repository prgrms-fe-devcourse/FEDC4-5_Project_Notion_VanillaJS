import SidebarPage from "./sidebar/SidebarPage";
import documentStore from "../util/documentStore.js";

export default class App {
  constructor({ $target }) {
    this.$target = $target;
    this.documentStore = new documentStore();

    this.init();
  }

  async init() {
    await this.documentStore.documentsGet();
    this.render();
  }

  render() {
    const { documentStore } = this;

    new SidebarPage({
      $target: this.$target,
      documentStore,
    });
  }
}
