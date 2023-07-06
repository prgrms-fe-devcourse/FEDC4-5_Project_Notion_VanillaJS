import Editor from "./Editor.js";
import { request } from "./api.js";

export default function EditorPage({ $target }) {
  this.state = {
    selectedDocumentId: null,
    documentContent: {},
  };

  this.setState = (newState) => {
    this.state = newState;
    this.state.selectedDocumentId
      ? editor.setState(this.state.documentContent)
      : editor.setState({ content: "", title: "", id: null });
  };

  let timer = null;

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
    onEditing: (documentInfo) => {
      const { id, title, content } = documentInfo;

      $target.querySelector(
        `div[data-document-id="${id}"]`
      ).children[0].children[0].children[1].textContent = title;
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await request(`/documents/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            title,
            content,
          }),
        });
      }, 2000);
    },
  });
}
