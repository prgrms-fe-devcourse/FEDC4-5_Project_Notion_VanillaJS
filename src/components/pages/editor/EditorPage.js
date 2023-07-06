import Editor from './Editor.js';
import { request } from '../../../utils/apis/api.js';

export default function EditorPage({ $target, initialState, onRerender }) {
  const $editorPage = document.createElement('section');
  $editorPage.className = 'editor';
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    getDocument();
    this.render();
  };

  let timer = null;

  const editor = new Editor({
    $target: $editorPage,
    initialState: {},
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await updateDocument(this.state.documentId, document);
        await onRerender();
      }, 0);
    },
  });

  const getDocument = async () => {
    const documents = await request(`/documents/${this.state.documentId}`);
    editor.setState(documents);
  };

  const updateDocument = async (id, data) => {
    await request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  this.render = () => {
    $target.appendChild($editorPage);
  };
}
