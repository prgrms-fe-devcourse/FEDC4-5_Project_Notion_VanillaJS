import { editorViewRouter } from './editorViewRouter';

export const editorViewSwitcher = (appEl, isNormal) => {
  const editorEl = document.getElementById('editor-app');
  const introEl = document.getElementById('intro-page');
  const notFoundEl = document.getElementById('not-found-page');
  if (editorEl) {
    editorEl.remove();
  }
  if (introEl) {
    introEl.remove();
  }
  if (notFoundEl) {
    notFoundEl.remove();
  }
  editorViewRouter(appEl, introEl, notFoundEl, isNormal);
};
