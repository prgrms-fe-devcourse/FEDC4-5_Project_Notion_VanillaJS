import DocumentList from './DocumentList.js';
import { request, getDocumentId } from './api.js';
import Editor from './Editor.js';
import { setItem, getItem } from './storage.js';
import DocumentEditComponent from './DocumentEditComponent.js';

export default function DocumentsPage({ target }) {
  const page = document.createElement('div');
  page.setAttribute('class', 'page');

  const docEditComponent = new DocumentEditComponent({
    target: page,
    initialState: {
      doc: [],
    },
  });

  const fetchDoc = async (id) => {
    const doc = await getDocumentId(id);

    docEditComponent.setState({
      doc,
    });
  };

  this.sendId = (id) => {
    fetchDoc(id);
    this.render();
  };

  const fetchDocsList = async () => {
    const docs = await request('/');
  };

  this.render = async () => {
    await fetchDocsList();
    target.appendChild(page);
  };
}
