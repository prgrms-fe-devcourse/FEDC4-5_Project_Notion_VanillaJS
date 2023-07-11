import { editorViewRouter } from './editorViewRouter';

export const editorViewSwitcher = (appEl) => {
  const editorEl = document.getElementById('editor-app');
  const introEl = document.getElementById('intro-page');
  if (editorEl) {
    editorEl.remove();
  } else {
    introEl.remove();
  }
  editorViewRouter(appEl, introEl);
};
