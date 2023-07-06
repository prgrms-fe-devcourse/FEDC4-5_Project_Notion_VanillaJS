import DocumentTilte from "./DocumentTitle.js";
import DefaultPage from "./DefaultPage.js";
import store from "../../util/Store.js";
import DocumentEditor from "./DocumentEditor.js";
import DocumentToolbar from "./DocumentToolbar.js";
import SubfolderView from "./SubfolderView.js";
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
    const pattern = /^\/documents\/[0-9]+$/;

    if (pathname === "/") {
      new DefaultPage({
        $target: $editorPage,
      });
    } else if (pattern.test(pathname)) {
      new DocumentTilte({
        $target: $editorPage,
      });

      new DocumentToolbar({
        $target: $editorPage,
      });

      new DocumentEditor({
        $target: $editorPage,
      });

      new SubfolderView({
        $target: $editorPage,
      });
    }
  }

  hide() {
    const { $editorPage } = this;

    while ($editorPage.firstChild) {
      $editorPage.removeChild($editorPage.firstChild);
    }
  }
}
