import Editor from './Editor.js';
import { getDocument } from '../../../apis/api.js';
import { debounce } from '../../../utils/debounce.js';

export default function EditorPage({ $target, initialState, onRerender }) {
  const $editorPage = document.createElement('section');
  $editorPage.className = 'editor';
  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;
    editor.setState(await getDocument(this.state.documentId));
    $target.appendChild($editorPage);
  };

  const editor = new Editor({
    $target: $editorPage,
    initialState: {},
    onEditing: (document) => {
      debounce(this.state.documentId, document, onRerender);
    },
  });

  this.render = () => $target.appendChild($editorPage);
}
