import Component from "./core/Component";
import Document from "./components/Document";
import Intro from "./routes/Intro";
import { PostRouter } from "./routes/PostRouter";
import { PostChanger } from "./routes/PostChanger";

export default class App extends Component {
  render() {
    const documentEl = new Document().el;
    const introEl = new Intro().el;

    this.el.append(documentEl);
    this.el.setAttribute("id", "notion-app");

    PostRouter(this.el, introEl);

    window.addEventListener("route-event", () => {
      PostChanger(this.el);
    });
    window.addEventListener("popstate", () => {
      PostChanger(this.el);
    });
    window.addEventListener("404-not-found", () => {
      // TODO: 404 페이지 렌더링
      console.log("404 Not Found");
    });
  }
}
