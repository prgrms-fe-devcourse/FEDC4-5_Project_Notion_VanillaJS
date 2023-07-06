import Button from "../Button.js";
import Header from "../Header.js";
import List from "../PostComponents/List.js";

export default function PostPage({
  $target,
  initalState = { selectedId: null, posts: [] },
  onAdd,
  onDelete,
}) {
  if (!new.target)
    new PostPage({
      $target,
      initalState: { selectedId: null, posts: [] },
      onAdd,
      onDelete,
    });

  const $page = document.createElement("section");
  $page.classList.add("postContainer");

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    list.setState(this.state || { selectedId: null, posts: [] });
    this.render();
  };

  let isInit = false;
  new Header({ $target: $page, initalState: { title: "📚 정호의 Notion" } });

  const list = new List({
    $target: $page,
    initalState: this.state,
    onAdd,
    onDelete,
  });

  new Button({
    $target: $page,
    initalState: { className: "page_add", text: "+ add Page" },
    onAdd,
  });

  this.render = () => {
    if (!isInit) {
      $target.appendChild($page);
      isInit = true;
    }
  };
}
