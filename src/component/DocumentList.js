import { setItem } from "../core/storage.js";
import { push } from "../core/router.js";
import { request } from "../core/api.js";
export default function DocumentList({
  $target,
  initialState,
  onClick,
  onPost,
  onDelete,
}) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);
  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;
    await this.render();
  };

  this.render = async () => {
    if (this.state.documentList.length == 0) return;
    const documentId = this.state.currentDocumentId;
    $documentList.innerHTML = `<div class="documentListItem">${this.state.documentList
      .map(
        (document) => `
  <p id="${document.id}" style="text-indent:${
          document.depth * 10
        }px; background-color:${
          document.id == documentId ? "gray" : "white"
        }">${
          document.title
        }<button class="postDocument">+</button><button class="deleteDocument">x</button></p>
    `
      )
      .join("")}<p id="null"><button class="postDocument">+</button></p></div>`;
  };

  this.render();

  this.fetchDocumentList = async () => {
    let res = await request("/documents", {
      method: "GET",
    });

    if (res.length == 0) {
      await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "문서 제목",
          parent: null,
        }),
      });
      res = await request("/documents", {
        method: "GET",
      });
    }

    return res;
  };

  $documentList.addEventListener("click", (e) => {
    if (e.target.id != "") {
      const { id } = e.target;
      const nextState = onClick(id);
      setItem("tempSaveKey", nextState);
      this.setState(nextState);
      push(`/documents/${id}`);
    }
  });

  $documentList.addEventListener("click", (e) => {
    const { className } = e.target;
    const { id } = e.target.closest("p");

    if (className == "postDocument") {
      onPost(id);
    }
    if (className == "deleteDocument") {
      onDelete(id);
    }
  });
}
