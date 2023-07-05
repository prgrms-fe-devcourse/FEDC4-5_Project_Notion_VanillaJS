import PostPage from "./components/page/PostPage.js";
import { request } from "./util/api.js";

export default function App({ $target, initalState }) {
  if (!new.target) new App({ $target });

  this.setState = (nextState) => {
    postPage.setState(nextState);
  };

  const onAdd = (id) => {};

  const onEdit = (id) => {};

  const onDelete = (id) => {};

  const postPage = new PostPage({ $target, initalState, onAdd });

  this.route = async () => {
    const { pathname } = location;
    if (pathname === "/") {
      const posts = await request("/documents", { method: "GET" });
      this.setState({ posts });
    }
  };

  this.route();
}
