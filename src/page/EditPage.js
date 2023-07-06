import Editor from "/src/component/Editor.js";
import { fetchDocument } from "/src/service/documentEditService.js";

function EditPage({ $app, handleEdit }) {
  const $page = document.createElement("div");
  $app.appendChild($page);

  this.state = { id: null };

  this.setState = async nextState => {
    this.state = nextState;
    if (this.state.id === null) return;

    const selectDocument = this.state.id
      ? await fetchDocument(this.state.id)
      : { title: "", content: "" };
    editor.setState(selectDocument);
  };

  const editor = new Editor({
    $page,
    onEdit: document => handleEdit(document),
  });
}

export default EditPage;
