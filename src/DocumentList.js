import { push } from "./router.js";

export default function DocumentList({
  $target,
  initialState,
  onCreateDocument,
  onDeleteDocument,
}) {
  const $documentList = document.createElement("div");

  $documentList.className = "documentList";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.displayDocumentList = (docList) => {
    return docList
      .map(
        (doc) =>
          `<li class="title" data-id="${doc.id}" title="${doc.title}">    
        ${doc.title}
            <button class="add">+</button>
            <button class="delete">x</button>
            ${
              doc.documents.length > 0
                ? `<ul>${this.displayDocumentList(doc.documents)}</ul>`
                : ""
            }          
        </li>`
      )
      .join("");
  };

  this.render = () => {
    $documentList.innerHTML = `
        <ul>
        ${this.displayDocumentList(this.state.docs)}
        </ul>
        `;
    $target.appendChild($documentList);
  };

  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");

    const { id } = $li.dataset;
    const name = e.target.className;

    if (name === "title") {
      push(`/documents/${id}`);
    } else if (name === "add") {
      onCreateDocument(id);
    } else if (name === "delete") {
      onDeleteDocument(id);
    }
  });
}
