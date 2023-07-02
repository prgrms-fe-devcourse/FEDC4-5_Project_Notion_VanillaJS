import SidebarPage from "./sidebar/SidebarPage";
import EditorPage from "./editor/editorPage";
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
    const { $target } = this;

    new SidebarPage({
      $target,
    });

    new EditorPage({
      $target,
    });
  }
}
