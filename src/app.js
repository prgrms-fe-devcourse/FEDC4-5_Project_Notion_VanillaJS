import Component from './core/Component';
import Document from './components/Document';
import Intro from './routes/Intro';
import { editorViewRouter } from './routes/editorViewRouter';
import { editorViewSwitcher } from './routes/editorViewSwitcher';

export default class App extends Component {
  render() {
    const documentEl = new Document().el;
    const introEl = new Intro().el;

    this.el.append(documentEl);
    this.el.setAttribute('id', 'notion-app');

    editorViewRouter(this.el, introEl);

    window.addEventListener('route-event', () => {
      editorViewSwitcher(this.el);
    });
    window.addEventListener('popstate', () => {
      editorViewSwitcher(this.el);
    });
    window.addEventListener('404-not-found', () => {
      // TODO: 404 페이지 렌더링
      console.log('404 Not Found');
    });
  }
}
