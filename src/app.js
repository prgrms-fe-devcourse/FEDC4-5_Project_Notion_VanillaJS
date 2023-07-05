import Component from "./core/Component";
import Document from "./components/Document";
import Editor from "./components/Editor";
import Intro from "./routes/Intro";

export default class App extends Component {
  render() {
    const documentEl = new Document().el;
    const introEl = new Intro().el;

    this.el.append(documentEl);
    this.el.setAttribute("id", "notion-app");

    const PostRouter = () => {
      const { pathname } = window.location;
      if (pathname === "/") {
        this.el.append(introEl);
      } else if (pathname.indexOf("/post/") === 0) {
        const [, , postId] = pathname.split("/");
        const editorEl = new Editor(postId).el;
        this.el.append(editorEl);
      }
    };
    PostRouter();

    window.addEventListener("route-event", () => {
      const editorEl = document.getElementById("editor-app");
      if (editorEl) {
        editorEl.remove();
      } else {
        introEl.remove();
      }
      PostRouter();
    });
  }
}
