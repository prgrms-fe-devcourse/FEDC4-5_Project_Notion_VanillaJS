import { request } from "./api.js";
import LinkButton from "./LinkButton.js";
import PostList from "./PostList.js";

export default function PostNavBar({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target: $page,
    initialState: [],
  });

  new LinkButton({
    $target: $page,
    initialState: {
      text: "New Post",
      link: "/new",
    },
  });

  this.setState = async () => {
    const post = await request();
    postList.setState(post);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };
}
