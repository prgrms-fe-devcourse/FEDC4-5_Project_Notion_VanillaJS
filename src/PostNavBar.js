import { request } from "./api.js";
import PostList from "./PostList.js";
import { pushRouter } from "./router.js";

export default function PostNavBar({ $target }) {
  const $page = document.createElement("div");
  const $createButton = document.createElement("button");

  const postList = new PostList({
    $target: $page,
    initialState: [],
  });

  this.setState = async () => {
    const documents = await request("/documents");
    postList.setState(documents);
    this.render();
  };

  this.render = async () => {
    $createButton.textContent = "+";
    $page.appendChild($createButton);
    $target.appendChild($page);
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
