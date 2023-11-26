import Editor from '../component/Editor.js';
import { requestGetDocument } from '../service/documentEditService.js';

function EditPage({ $app, handleEdit }) {
  const $page = document.createElement('div');
  $app.appendChild($page);

  this.state = { id: null };

  this.setState = async (nextState) => {
    this.state = nextState;
    const selectDocument = this.state.id
      ? await requestGetDocument(this.state.id)
      : { id: null, title: '', content: '' };
    const editDocument = {
      ...selectDocument,
      emoji: selectDocument.title.substring(0, 2),
      title: selectDocument.title.substring(3),
    };
    editor.setState(editDocument);
  };

  const editor = new Editor({
    $page,
    onEdit: (document) => handleEdit(document),
  });
}

export default EditPage;
