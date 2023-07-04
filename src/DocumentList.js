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

  this.displayDocumentList = (docList, depth = 0) => {
    return docList
      .map(
        (doc) =>
          `<li class="title" data-id="${doc.id}" title="${doc.title}">    
        ${doc.title}
            <button class="add">+</button>
            <button class="delete">x</button>
            ${
              doc.documents.length > 0
                ? `<ul>${this.displayDocumentList(
                    doc.documents,
                    depth + 1
                  )}</ul>`
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
}
