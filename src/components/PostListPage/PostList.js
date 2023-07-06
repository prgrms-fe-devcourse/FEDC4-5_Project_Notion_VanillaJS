import { CLASSNAME } from "../../utils/constants.js";

export default function PostList({
  $target,
  initialState,
  onCreateSubPost,
  onDeletePost,
  onEditPost,
}) {
  const $list = document.createElement("div");
  $list.className = CLASSNAME.POST_LIST;
  $target.appendChild($list);

  $list.addEventListener("click", (e) => {
    const $li = e.target.closest("li");

    const { id } = $li.dataset;

    switch (e.target.className) {
      case CLASSNAME.ADD_SUB_POST_BTN:
        onCreateSubPost(id);
        break;
      case CLASSNAME.DELETE_POST_BTN:
        onDeletePost(id);
        break;
      default:
        onEditPost(id);
    }
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const makeLists = ({ title, id, documents }, documentsList) => {
    documentsList.push(
      `<li data-id=${id}>
      <span class=${CLASSNAME.POST_TITLE}>❯ ${title}</span>
      <button type="button" class=${CLASSNAME.ADD_SUB_POST_BTN}>+</button>
      <button type="button" class=${CLASSNAME.DELETE_POST_BTN}>-</button>
      </li>`
    );

    if (documents.length === 0) return documentsList;

    documentsList.push("<ul>");
    for (let document of documents) {
      const { title, id, documents } = document;
      makeLists({ title, id, documents }, documentsList);
    }
    documentsList.push("</ul>");

    return documentsList;
  };

  this.render = () => {
    $list.innerHTML = `
    <ul>
      ${this.state
        .map(({ title, id, documents }) =>
          makeLists({ title, id, documents }, []).join("")
        )
        .join("")}  
    </ul>`;
  };

  this.render();
}
