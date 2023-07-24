import { getData, postData } from "../utils/api.js";
import PostList from "./PostList.js";
import { pushRouter } from "../utils/router.js";

export default function PostSidebar({ $target }) {
  const $listContainer = document.createElement("div");
  const $createButton = document.createElement("button");
  const $title = document.createElement("h1");
  $listContainer.className = "post-list-container";
  $createButton.className = "create-button";
  $title.className = "title";

  const postList = new PostList({
    $target: $listContainer,
    initialState: [],
  });

  this.setState = async () => {
    const documents = await getData("/documents");
    postList.setState(documents);
    this.render();
  };

  this.render = async () => {
    $createButton.textContent = "문서 생성하기";
    $title.textContent = "Notion Project";
    $target.appendChild($title);
    $target.appendChild($createButton);
    $target.appendChild($listContainer);
  };

  $createButton.addEventListener("click", async () => {
    const createdPost = await postData();
    pushRouter(`/documents/${createdPost.id}`);
  });
}
