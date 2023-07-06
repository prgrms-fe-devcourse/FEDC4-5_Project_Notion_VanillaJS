import DocumentList from './DocumentList.js';
import { request } from './api.js';
import Editor from './Editor.js';
import { setItem, getItem } from './storage.js';
import DocumentEditComponent from './DocumentEditComponent.js';

export default function DocumentsPage({ target }) {
  const page = document.createElement('div');

  // docList
  const docList = new DocumentList({
    target,
    initialState: [],
  });

  // document edit page
  const docEditComponent = new DocumentEditComponent({
    target,
    initialState: {
      doc: [],
    },
  });

  const fetchDoc = async () => {
    const { id } = this.state;

    const doc = await getDocumentId(id);

    this.setState({
      ...this.state,
      doc,
    });
  };

  this.sendId = (id) => {
    console.log('page에서 확인', id);
    docEditComponent.setState(id);
    this.render();
  };

  const fetchDocsList = async () => {
    const docs = await request('/');
    docList.setState(docs);
  };

  this.render = async () => {
    await fetchDocsList();
    await fetchDoc();
    target.appendChild(page);
  };
}
