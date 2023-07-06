import PostEditPage from "./PostEditPage/PostEditPage.js";
import PostListPage from "./PostListPage/PostListPage.js";
import { initRouter } from "../utils/router.js";

export default function App({ $target }) {
  const postListPage = new PostListPage({
    $target,
    initialState: [],
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {},
    postListUpdate: () => postListPage.setState(),
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      $target.innerHTML = "";
      postListPage.setState();
    } else if (pathname.indexOf("/documents") === 0) {
      const [, , id] = pathname.split("/");
      postEditPage.setState({ id }); // 여기서 리스트까지 렌더링됨
    } else {
      $target.innerHTML = `<h1>빈 페이지...</h1>`;
      alert("경로를 다시 입력해주세요!");
    }
  };

  this.route();

  window.addEventListener("popstate", () => this.route());

  initRouter(() => this.route());
}
