import Editor from '../components/Editor';

export const editorViewRouter = (appEl, introEl, notFoundEl, isNormal) => {
  const { pathname } = window.location;
  if (pathname === '/') {
    appEl.append(introEl);
  } else if (pathname.indexOf('/documents/') === 0) {
    if (!isNormal) {
      appEl.append(notFoundEl);
      return;
    }
    const [, , postId] = pathname.split('/');
    const editorEl = new Editor(postId).el;
    appEl.append(editorEl);
  }
};
