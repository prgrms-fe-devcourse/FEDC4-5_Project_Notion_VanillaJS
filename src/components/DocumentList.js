import { getItem, setItem, storageKey } from "../util/storage.js";

export default function DocumentList({
  $target,
  initialState,
  onContentView,
  onRemove,
  onAdd,
}) {
  const $page = document.createElement("div");

  $page.setAttribute("class", "global-nav");
  $target.appendChild($page);

  const $documentContainer = (title, id, curId, depth) => {
    return `
      <div class="outliner ${
        depth === 0 || isClicked[String(id)]
          ? "document-open"
          : "document-close"
      } depth-${curId}-${depth}" data-depth=${depth} data-document-id="${id}">
          <div class="document-container">
            <button class="document-view-button">></button>
            <div class="document-title"  >
              ${title}
            </div>
            <button class="remove-button">삭제</button>
            <button class="add-button">추가</button>
          </div>
      </div>
    `;
  };

  const appendDocuments = (title, id, curId, depth) => {
    const $div = document.createElement("div");
    const $targetElement = curId
      ? $page.querySelector(`div[data-document-id="${curId}"]`)
      : $page;

    $div.setAttribute("class", "list");
    $targetElement.appendChild($div);
    $div.innerHTML = $documentContainer(title, id, curId, depth);
  };

  const createDocuments = ({
    documents = this.state.documentsList,
    curId = null,
    depth = 0,
  }) => {
    if (documents === this.state.documentsList) {
      $page.innerHTML = "";
    }
    const stack = [...documents];

    while (stack.length > 0) {
      const curDocument = stack.shift();
      const { title, documents, id } = curDocument;

      if (!isClicked[String(id)]) {
        isClicked[String(id)] = false;
      }
      appendDocuments(title, id, curId, depth);

      if (documents.length > 0) {
        createDocuments({ documents, curId: id, depth: depth + 1 });
      }
    }
    if (documents === this.state.documentsList) {
      $page.innerHTML += `<div class="root-button"><button class="add-button">+ 페이지 추가</button></div>`;
    }
  };

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  $page.addEventListener("click", async (event) => {
    const { className } = event.target;
    const $div = event.target.closest(`.outliner`);

    if ($div) {
      const { documentId } = $div.dataset;
      const classReName = className.replaceAll("-", "_");

      if (buttonMap[classReName]) {
        await buttonMap[classReName](documentId, $div);
      }
    } else if (className === "add-button") {
      onAdd(null);
    }
  });

  const remove_button = (documentId) => {
    onRemove(documentId);
  };
  const add_button = async (documentId, $div) => {
    const { depth } = $div.dataset;
    const $childDivList = $div.querySelectorAll(
      `.depth-${documentId}-${Number(depth) + 1}`
    );

    if ($childDivList) {
      Array.from($childDivList).forEach(($childDiv) => {
        const { documentId } = $childDiv.dataset;

        isClicked[documentId] = true;
      });
      setItem(storageKey, JSON.stringify(isClicked));
    }

    await onAdd(documentId);
  };
  const document_view_button = (documentId, $div) => {
    const { depth } = $div.dataset;
    const $childDivList = $div.querySelectorAll(
      `.depth-${documentId}-${Number(depth) + 1}`
    );

    if ($childDivList) {
      Array.from($childDivList).forEach(($childDiv) => {
        const { documentId } = $childDiv.dataset;

        isClicked[documentId] = !isClicked[documentId];
      });
      setItem(storageKey, JSON.stringify(isClicked));
      this.render();
    } else {
      alert("하위 페이지 없음");
    }
  };
  const document_title = (documentId) => {
    onContentView(documentId);
  };

  const buttonMap = {
    remove_button,
    add_button,
    document_view_button,
    document_title,
  };
  let isClicked = {};
  this.render = () => {
    if (this.state.documentsList.length) {
      isClicked = getItem(storageKey, {});
      createDocuments({});
    }
    if (this.state.selectedDocument) {
      const { id, title } = this.state.selectedDocument;
      const $selectedDiv = $target.querySelector(
        `div[data-document-id="${id}"]`
      );
      const $selectedTitle = $selectedDiv.querySelector(".document-title");

      $selectedTitle.textContent = title;
    }
  };

  this.render();
}
