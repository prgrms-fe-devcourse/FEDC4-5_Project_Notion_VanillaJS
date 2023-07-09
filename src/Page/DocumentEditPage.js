import { updateDocument, fetchDocument } from '../api/Document/index.js';
import INIT_DOCUMENT from '../constants/document.js';
import Editor from '../Component/Editor/Editor.js';
import EditorPreview from '../Component/Editor/EditorPreview.js';
import convertMarkdownToHTML from '../utils/parseIntoMarkdown.js';
import { DOCUMENT_DEBOUNCE_TIME } from '../constants/api.js';

export default function DocumentEditPage({
  $target,
  initalState,
  onChangeEditorTitle,
}) {
  const $page = document.createElement('div');

  this.state = initalState;

  this.setState = async (nextState) => {
    if (nextState.documentId === 'new') {
      editor.setState(INIT_DOCUMENT);
      return;
    }
    const { documentId } = nextState;

    this.state = {
      ...this.state,
      nextState,
    };

    await fetchDocument(documentId)
      .then((nextDocument) => {
        const { id, title, content, documents } = nextDocument;
        editor.setState({
          ...editor.state,
          id,
          title,
          content,
          documents,
        });
        editorPreview.setState(convertMarkdownToHTML(content));
      })
      .catch((e) => alert(e));
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const editorPreview = new EditorPreview({
    $target,
    initalState: this.state.content || '',
  });

  let timer = null;
  const editor = new Editor({
    $target,
    initalState: INIT_DOCUMENT,
    onEditing: (document) => {
      const { content, id } = document;

      editorPreview.setState(convertMarkdownToHTML(content));
      if (id === INIT_DOCUMENT.id) {
        return;
      }
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await updateDocument(document).catch((e) => alert(e));
        onChangeEditorTitle();
      }, DOCUMENT_DEBOUNCE_TIME);
    },
  });
}
