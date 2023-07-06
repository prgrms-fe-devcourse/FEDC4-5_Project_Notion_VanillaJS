import EditorPage from "./src/pages/EditorPage.js";
import ListPage from "./src/pages/ListPage.js";
import { initRouter } from "./src/utils/router.js";

const $app = document.querySelector(".App");
const $sidebar = $app.querySelector(".listPage");
const $editor = $app.querySelector(".editorPage");

const listPage = new ListPage({ $target: $sidebar });
const editorPage = new EditorPage({
  $target: $editor,
  onEdit: () => {
    listPage.render();
  },
});

initRouter(() => editorPage.setState());
