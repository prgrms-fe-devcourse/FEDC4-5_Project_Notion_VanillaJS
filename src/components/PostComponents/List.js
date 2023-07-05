import { getItem, setItem } from "../../util/storaged.js";
import { VISITED_LOCAL_KEY } from "../../constant.js";
import { push } from "../../util/router.js";

export default function List({ $target, initalState, onAdd, onDelete }) {
  if (!new.target)
    new List({
      $target,
      initalState,

      onAdd,
      onDelete,
    });

  const $list = document.createElement("div");

  this.state = initalState;

  $target.appendChild($list);

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  const createDocument = (
    { id, title, documents },
    arr,
    visitedDocumentsId
  ) => {
    arr.push(`
      <li data-document-id="${id}" class="item ${
      this.state.selectedId === id ? "item__fiexed" : ""
    }">
        <button type="button" class="toggle ${
          visitedDocumentsId.indexOf(id) > -1 ? "active" : ""
        }">▶</button>
        <span class="item__txt">${title}</span>
        <button type="button" class="add">✚</button>
        <button type="button" class="delete">❌</button>
      </li>
    `);

    if (documents.length) {
      arr.push(
        `<ul style="display:${
          visitedDocumentsId.indexOf(id) > -1 ? "block" : "none"
        }">`
      );
      for (const document of documents)
        createDocument(document, arr, visitedDocumentsId);
      arr.push(`</ul>`);
    } else {
      arr.push(
        `<span class="item__no__result" style="display:${
          visitedDocumentsId.indexOf(id) > -1 ? "block" : "none"
        }">No result</span>`
      );
    }

    return arr.join("");
  };

  this.render = () => {
    if (!Array.isArray(this.state.posts)) {
      $list.innerHTML = `페이지를 추가해주세요!`;
      return;
    }

    const visitedDocumentsId = getItem(VISITED_LOCAL_KEY, []);

    $list.innerHTML = `
      <ul>
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
    const {
      dataset: { documentId },
    } = $li;
    const id = parseInt(documentId);
    if (className === "add") {
      onAdd(id);
    } else if (className === "toggle " || className === "toggle active") {
      ToggleItem(event.target, id);
    } else if (className === "delete") {
      // onDelete(id);
    } else if (className === "item" || className === "item block") {
      push(`/documents/${id}`);
      // this.render();
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
    this.render();
  };

  const onItemHover = (target) => {
    const $li = target.closest("li");
    if ($li) $li.classList.toggle("block");
  };

  $list.addEventListener("mouseover", (event) => onItemHover(event.target));
  $list.addEventListener("mouseout", (event) => onItemHover(event.target));

  this.render();
}
