import PostPage from "./components/page/PostPage.js";
import { request } from "./util/api.js";

export default function App({ $target, initalState }) {
  if (!new.target) new App({ $target });

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  const postPage = new PostPage({ $target, initalState });

  this.route = async () => {
    const { pathname } = location;
    if (pathname === "/") {
      const posts = await request("/documents", { method: "GET" });
      postPage.setState({ posts });
    }
  };

  this.route();
}
