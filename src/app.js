import Component from "./core/Component";
import Document from "./components/Document";
import Editor from "./components/Editor";

export default class App extends Component {
  render() {
    const documentEl = new Document().el;
    const editorEl = new Editor().el;

    this.el.append(documentEl, editorEl);
    this.el.setAttribute("id", "notion-app");
  }
}
