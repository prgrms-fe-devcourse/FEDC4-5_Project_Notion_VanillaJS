import { request } from "../core/api.js";
import Editor from "./Editor.js";
import nestedObjectToArray from "../core/nestedObjectToArray.js";
export default function Document({ $target, initialState }) {
  const $document = document.createElement("div");
  $target.appendChild($document);
  this.state = initialState;
  this.setState = async (nextState) => {
    this.state = nextState;
    await editor.setState(this.state);
    await this.render();
  };

  this.render = async () => {
    $target.appendChild($document);
  };

  this.render();

  let timer = null;

  const editor = new Editor({
    $target: $document,
    initialState: this.state,
    onEditing: async (document) => {
      const documentId = this.state.currentDocumentId;
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await request(`/documents/${documentId}`, {
          method: "PUT",
          body: JSON.stringify(document),
        });
        const nextState = nestedObjectToArray(
          await request(`/documents/${documentId}`, {
            method: "GET",
          })
        );
        setItem("tempSaveKey", nextState);
      }, 1000);
    },
  });
}
