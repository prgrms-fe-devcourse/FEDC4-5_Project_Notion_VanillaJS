import { request } from '../../api.js';
import Editor from './Editor.js';

export default function EditPage({ $target, initialState, onChange }) {
  const $page = document.createElement('div');

  this.state = initialState;

  const fetchDocument = async () => {
    const { documentId } = this.state;
    if (documentId !== 'new') {
      const document = await request(`/documents/${documentId}`); //api GET
      this.setState({
        ...this.state,
        document,
      });
    }
  };

  let timer = null;
  const editor = new Editor({
    $target: $page,
    initialState: this.state.document,
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const isNew = this.state.documentId === 'new';
        if (isNew) {
          const createdDocument = await request('/documents', {
            method: 'POST',
            body: JSON.stringify({
              title: document.title,
              parent: this.state.parent,
            }),
          });
          this.setState({
            documentId: createdDocument.id,
            document,
          });
          onChange();
        } else {
          await request(`/documents/${this.state.documentId}`, {
            method: 'PUT',
            body: JSON.stringify(document),
          });
        }
        onChange();
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      if (this.state.documentId === 'new') {
        this.render();
        editor.setState({ title: '', content: '' });
      } else {
        await fetchDocument();
      }
      return;
    }
    this.state = nextState;
    editor.setState(this.state.document || { title: '', content: '' });
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
