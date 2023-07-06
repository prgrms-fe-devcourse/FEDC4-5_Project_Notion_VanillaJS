import { request } from "../core/api.js";

export default function Editor({
  $target,
  initialState = { title: "", content: "" },
  onEditing,
}) {
  const $editor = document.createElement("div");

  let isInitialize = false;

  this.state = initialState;
  $editor.style.width = "300px";
  $editor.style.height = "300px";
  $target.appendChild($editor);

  this.setState = async (nextState) => {
    this.state = nextState;
    const documentId = this.state.currentDocumentId;
    const currentDocument = await request(`/documents/${documentId}`, {
      method: "GET",
    });
    $editor.querySelector("[name=title]").value = currentDocument.title;
    $editor.querySelector("[name=content]").value = currentDocument.content;
    this.render();
  };

  this.render = async () => {
    const documentId = this.state.currentDocumentId;
    const currentDocument = await request(`/documents/${documentId}`, {
      method: "GET",
    });
    if (!isInitialize) {
      $editor.innerHTML = `
      <input type="text" name="title" style="width:300px;" value="${currentDocument.title}"/>
      <textarea name="content" style="width:300px;height:300px;">${currentDocument.content}</textarea>`;
      isInitialize = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", async (e) => {
    const document = {
      title: $editor.querySelector("[name=title]").value,
      content: $editor.querySelector("[name=content]").value,
    };
    onEditing(document);
  });
}
