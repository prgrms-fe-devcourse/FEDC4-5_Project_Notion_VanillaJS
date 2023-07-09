import { PostRouter } from "./PostRouter";

export const PostChanger = (appEl) => {
  const editorEl = document.getElementById("editor-app");
  const introEl = document.getElementById("intro-page");
  if (editorEl) {
    editorEl.remove();
  } else {
    introEl.remove();
  }
  PostRouter(appEl, introEl);
};
