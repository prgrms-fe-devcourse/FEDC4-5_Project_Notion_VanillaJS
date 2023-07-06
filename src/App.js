import PostEditPage from "./PostEditPage.js";
import SidebarPage from "./SidebarPage.js";
import { initRouter } from "./router.js";

export default function App({ $target, username }) {
  const $sidebarContainer = document.createElement("div");
  const $postContainer = document.createElement("div");
  $sidebarContainer.className = "sidebarContainer";
  $postContainer.className = "postContainer";

  $target.appendChild($sidebarContainer);
  $target.appendChild($postContainer);

  const postPage = new SidebarPage({ $target: $sidebarContainer, username });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      id: "root",
    },
    username,
  });

  this.route = () => {
    // $sidebarContainer.innerHTML = "";
    // $postContainer.innerHTML = "";
    console.log("siv");
    const { pathname } = window.location;
    postPage.setState();

    if (pathname === "/") {
      postEditPage.setState({ id: "root" });
    } else {
      const [, id] = pathname.split("/");
      postEditPage.setState({ id: id }); // test id { id: 75417 }
    }
  };

  this.route();

  initRouter(() => this.route());
}
