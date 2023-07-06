import { request } from "./api.js";
import PostEditPage from "./PostEditPage.js";
import PostList from "./PostList.js";
import PostPage from "./PostPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const postPage = new PostPage({
    $target,
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

    if (pathname === "/") {
      postPage.setState();
    } else if (pathname.indexOf("/") === 0) {
      const [, postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route())

  console.log(request())
}
