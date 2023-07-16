import Editor from "../components/Editor.js";
import { request } from "../util/api.js";

export default function EditorPage({ $target, onTitleEdit }) {
  this.state = {
    selectedDocumentId: null,
    documentContent: {},
  };

  this.setState = (newState) => {
    this.state = newState;
    editor.setState(
      this.state.selectedDocumentId
        ? this.state.documentContent
        : { content: "", title: "", id: null }
    );
  };

  const onEditing = (documentInfo) => {
    const { id, title, content } = documentInfo;
    onTitleEdit(documentInfo);

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
    }, 500);
  };

  let timer = null;

  const editor = new Editor({
    $target,
    initialState: {
      title: "",
      content: "",
    },
    onEditing,
  });
}
