import PostItem from "./PostItem.js";

export default function PostList({ $target, initialState }) {
  const $postList = document.createElement("ul");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.makeList = ($itemContainer, data) => {
    data.forEach(({ title, documents, id }) => {
      const { $postItemBox, $postSubItemBox } = PostItem(title, id);

      $itemContainer.appendChild($postItemBox);

      if (documents.length > 0) {
        this.makeList($postSubItemBox, documents);
      }
    });
  };

  this.render = () => {
    $postList.innerHTML = "";
    this.makeList($postList, this.state);
  };

  this.render();
}
