import Component from './core/Component';
import Document from './components/Document';
import Intro from './routes/Intro';
import { editorViewRouter } from './routes/editorViewRouter';
import { editorViewSwitcher } from './routes/editorViewSwitcher';
import NotFound from './routes/NotFound';

export default class App extends Component {
  render() {
    const documentEl = new Document().el;
    const introEl = new Intro().el;
    const notFoundEl = new NotFound().el;

    this.el.append(documentEl);
    this.el.setAttribute('id', 'notion-app');

    editorViewRouter(this.el, introEl, notFoundEl, true);

    window.addEventListener('route-event', () => {
      editorViewSwitcher(this.el, true);
    });
    window.addEventListener('popstate', () => {
      editorViewSwitcher(this.el, true);
    });
    window.addEventListener('404-not-found', () => {
      editorViewRouter(this.el, introEl, notFoundEl, false);
      editorViewSwitcher(this.el, false);
    });
  }
}
