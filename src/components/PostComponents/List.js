import { getItem, setItem } from "../../util/storaged.js";
import { CLASSNAME, VISITED_LOCAL_KEY } from "../../constant.js";
import { push } from "../../util/router.js";
import { isArray, isLength } from "../../util/prevent.js";

export default function List({ $target, initalState, onAdd, onDelete }) {
  if (!new.target)
    new List({
      $target,
      initalState,
      onAdd,
      onDelete,
    });

  const $list = document.createElement("div");
  $list.classList.add("listContainer");
  this.state = initalState;

  $target.appendChild($list);

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  const createDocument = (
    { id, title, documents: childDocument },
    childTag,
    visitedDocumentsId
  ) => {
    childTag.push(`
      <li data-document-id="${
        id === "new" ? this.state.selectedId : id
      }" class="item ${this.state.selectedId === id ? "item__fiexed" : ""}">
        <button type="button" class="toggle ${
          visitedDocumentsId.indexOf(id) > -1 ? "active" : ""
        }">▶</button>
        <span class="item__txt">${title}</span>
        <button type="button" class="add">✚</button>
        <button type="button" class="delete">❌</button>
      </li>
    `);

    if (isLength(childDocument)) {
      childTag.push(
        `<ul style="display:${
          visitedDocumentsId.indexOf(id) > -1 ? "block" : "none"
        }" class="itemList">`
      );
      childDocument.forEach((document) =>
        createDocument(document, childTag, visitedDocumentsId)
      );
      childTag.push(`</ul>`);
    } else {
      childTag.push(
        `<span class="item__no__result" style="display:${
          visitedDocumentsId.indexOf(id) > -1 ? "block" : "none"
        }">No result</span>`
      );
    }

    return childTag.join("");
  };

  this.render = () => {
    if (!isArray(this.state.posts)) {
      $list.innerHTML = `페이지를 추가해주세요!`;
      return;
    }

    const visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []);

    $list.innerHTML = `
      <ul class="itemList">
        ${this.state.posts
          .map((document) => createDocument(document, [], visitedDocumentsId))
          .join("")}
      </ul>
    `;
  };

  $list.addEventListener("click", (event) => {
    const { className } = event.target;
    const $li = event.target.closest("li");
    if (!$li) return;
    const { documentId } = $li.dataset;
    const id = parseInt(documentId);
    if (className === "add") {
      onAdd(id);
    } else if (
      className === CLASSNAME.TOGGLE ||
      className === CLASSNAME.TOGGLE_ACTIVE
    ) {
      ToggleItem(event.target, id);
      this.render();
    } else if (className === CLASSNAME.DELETE) {
      onDelete(id);
    } else if (
      className === CLASSNAME.ITEM ||
      className === CLASSNAME.ITEM_BLOCK
    ) {
      push(`/documents/${id}`);
      this.render();
    }
  });

  const ToggleItem = (target, id) => {
    const visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []);
    target.classList.contains("active")
      ? setItem(
          VISITED_LOCAL_KEY,
          visitedDocumentsId.filter((visitedId) => visitedId !== id)
        )
      : setItem(VISITED_LOCAL_KEY, [...visitedDocumentsId, id]);
    target.classList.toggle("active");
  };

  const onItemHover = (target) => {
    const $li = target.closest("li");
    if ($li) $li.classList.toggle("block");
  };

  $list.addEventListener("mouseover", (event) => onItemHover(event.target));
  $list.addEventListener("mouseout", (event) => onItemHover(event.target));

  this.render();
}
