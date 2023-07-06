import { request } from '../../api.js';
import Editor from './Editor.js';

export default function EditPage({ $target, initialState }) {
  const $page = document.createElement('div');

  this.state = initialState;

  const fetchDocument = async () => {
    const { id } = this.state;
    if (documentId !== 'new') {
      const document = await request(`/documents/${id}`); //api GET
      console.log(document);
      this.setState({
        ...this.state,
        document,
      });
      return;
    }
  };

  let timer = null;
  const editor = new Editor({
    $target: $page,
    initialState: { title: '', content: '' },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        const newDocument = await request('/documents', {
          method: 'POST',
          body: JSON.stringify({
            title: document.title,
            parent:
              this.state.documentId === 'new' ? null : this.state.documentId,
          }),
        });
        console.log(newDocument);
      }, 1500);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      if (this.state.documentId === 'new') {
        editor.setState(this.state);
      } else {
        await fetchDocument();
      }
      return;
    }
    this.state = nextState;
    this.render();
    editor.setState(this.state.document || { title: '', content: '' });
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
