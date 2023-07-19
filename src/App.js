import PostEditPage from "./PostEditPage.js";
import PostSidebar from "./PostSidebar.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const $postSideBarContainer = document.createElement("div");
  const $postEditContainer = document.createElement("div");
  $target.appendChild($postSideBarContainer);
  $target.appendChild($postEditContainer);
  $postSideBarContainer.className = "post-side-bar-container";
  $postEditContainer.className = "post-edit-container";

  const postSideBar = new PostSidebar({
    $target: $postSideBarContainer,
  });

  const postEditPage = new PostEditPage({
    $target: $postEditContainer,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    postSideBar.setState();

    if (pathname !== "/" && pathname.indexOf("/") === 0) {
      const [, postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
