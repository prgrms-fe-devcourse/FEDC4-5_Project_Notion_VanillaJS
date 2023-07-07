import { request } from "./api.js";
import PostList from "./PostList.js";
import { pushRouter } from "./router.js";

export default function PostNavBar({ $target }) {
  const $nav = document.createElement("div");
  const $createButton = document.createElement("button");
  const $title = document.createElement("h1");
  $nav.id = "nav";
  $nav.className = "1";
  $createButton.id = "createButton";
  $title.id = "title";

  const postList = new PostList({
    $target: $nav,
    initialState: [],
  });

  this.setState = async () => {
    const documents = await request("/documents");
    postList.setState(documents);
    this.render();
  };

  this.render = async () => {
    $createButton.textContent = "문서 생성하기";
    $title.textContent = "Notion Project";
    $nav.appendChild($title);
    $nav.appendChild($createButton);
    $target.appendChild($nav);
  };

  $createButton.addEventListener("click", async () => {
    const createdPost = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
        parent: null,
      }),
    });
    pushRouter(`/${createdPost.id}`);
  });
}
