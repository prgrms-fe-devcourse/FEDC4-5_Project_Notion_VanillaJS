import { request } from "./api.js";
import PostList from "./PostList.js";
import { pushRouter } from "./router.js";

export default function PostSidebar({ $target }) {
  const $createButton = document.createElement("button");
  const $title = document.createElement("h1");
  $createButton.className = "createButton";
  $title.id = "title";

  const postList = new PostList({
    $target,
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
    $target.appendChild($title);
    $target.appendChild($createButton);
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
