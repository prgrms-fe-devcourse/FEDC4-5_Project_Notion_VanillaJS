import { getItem, setItem } from "./storage.js";

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

  let isClicked = {};

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    isClicked = getItem("isClicked", null) ?? {};
    this.createDocuments();
  };

  this.appendDocuments = (selectedDocument, id) => {
    const $div = document.createElement("div");
    const $targetElement = id
      ? $page.querySelector(`div[data-document-id="${id}"]`)
      : $page;

    $div.setAttribute("class", "list");
    $targetElement.appendChild($div);
    $div.innerHTML = `
      ${selectedDocument
        .map(
          (document) =>
            `
            <div class="outliner" data-document-id="${document.id}"
            style="display:${
              selectedDocument === this.state
                ? "block"
                : isClicked[String(document.id)]
                ? "block"
                : "none"
            }">
              <div class="inliner">
                <div class="document">
                  <button class="document-view-button">></button>
                  <div class="document-title"  >
                    ${document.title}
                  </div>
                  <button class="remove-button">삭제</button>
                  <button class="add-button">추가</button>
                </div>
              </div>
            </div>
            `
        )
        .join("")}
    `;
  };

  this.createDocuments = () => {
    $page.innerHTML = "";

    const stack = [{ documents: this.state, id: null }];
    let documents = null;

    while (stack.length > 0) {
      documents = stack.shift();

      documents.documents.forEach((document) => {
        if (!isClicked[String(document.id)])
          isClicked[String(document.id)] = false;
        if (document.documents.length > 0) {
          stack.push({
            documents: document.documents,
            id: document.id,
          });
        }
      });
      this.appendDocuments(documents.documents, documents.id);
    }
    $page.innerHTML += `<div class="root-button"><button class="add-button">+ 페이지 추가</button></div>`;
  };

  this.render();
  //클릭 할 때마다 하위 컴포넌트가 있는지, 많은 내용을 실행하게 되어 비효율적인 코드인지 궁금합니다..!
  $page.addEventListener("click", async (event) => {
    const { className } = event.target;
    const $div = event.target.closest(`div[class=outliner]`);

    if ($div) {
      const { documentId } = $div.dataset;

      if (className === "remove-button") {
        onRemove(documentId);
      } else if (className === "add-button") {
        await onAdd(documentId);
        this.render();
      } else if (className === "document-view-button") {
        const children = $div.lastChild.children;

        if (children) {
          for (let i = 0; i < children.length; i++) {
            isClicked[children[i].dataset.documentId] =
              !isClicked[children[i].dataset.documentId];
          }
          setItem("isClicked", JSON.stringify(isClicked));
          this.createDocuments();
        } else {
          alert("하위 페이지 없음");
        }
      } else if (className === "document-title") {
        onContentView(documentId);
      }
    } else if (className === "add-button") {
      onAdd(null);
    }
  });
}
