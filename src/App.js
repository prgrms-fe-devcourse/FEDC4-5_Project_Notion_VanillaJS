import { request } from "./api.js";
import PostEditPage from "./PostEditPage.js";
import PostPage from "./PostPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const postPage = new PostPage({
    $target,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;

    if (pathname !== '/' && pathname.indexOf("/") === 0) {
      const [, postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
    postPage.setState()
  };

  this.route();

  initRouter(() => this.route());
}
