import Editor from '../components/Editor';

export const editorViewRouter = (appEl, introEl) => {
  const { pathname } = window.location;
  if (pathname === '/') {
    appEl.append(introEl);
  } else if (pathname.indexOf('/documents/') === 0) {
    const [, , postId] = pathname.split('/');
    const editorEl = new Editor(postId).el;
    appEl.append(editorEl);
  }
};
