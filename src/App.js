import { request } from "./api.js";
import PostEditPage from "./PostEditPage.js";
import PostNavBar from "./PostNavBar.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const postNavBar = new PostNavBar({
    $target
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
    postNavBar.setState()
  };

  this.route();

  initRouter(() => this.route());
}
