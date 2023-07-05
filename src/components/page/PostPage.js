import List from "../List.js";

export default function PostPage({
  $target,
  initalState = { selectedId: null, posts: [] },
}) {
  if (!new.target)
    new PostPage({ $target, initalState: { selectedId: null, posts: [] } });

  const $page = document.createElement("section");

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    list.setState(this.state || [{ selectedId: null, posts: [] }]);
    this.render();
  };

  const list = new List({
    $target: $page,
    initalState: this.state,
    // onAdd,
    // onDelete,
    // onItemClick,
  });

  this.render = () => {
    $target.appendChild($page);
  };
}
