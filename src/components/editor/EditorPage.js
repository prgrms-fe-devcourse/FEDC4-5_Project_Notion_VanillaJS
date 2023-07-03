import DocumentTilte from "./DocumentTitle.js";
import DefaultPage from "./DefaultPage.js";
import store from "../../util/Store.js";

export default class EditorPage {
  constructor({ $target }) {
    this.$editorPage = document.createElement("section");
    this.$editorPage.classList.add("editor-section");

    $target.appendChild(this.$editorPage);

    store.subscribeEditor(() => {
      this.render();
    });

    this.render();
  }

  render() {
    this.hide();
    const { $editorPage } = this;
    const { pathname } = window.location;

    if (pathname === "/") {
      new DefaultPage({
        $target: $editorPage,
      });
    } else {
      new DocumentTilte({
        $target: $editorPage,
      });
    }
  }

  hide() {
    const { $editorPage } = this;
    const childComponent = $editorPage.firstElementChild;
    if (childComponent) {
      childComponent.remove();
    }
  }
}
