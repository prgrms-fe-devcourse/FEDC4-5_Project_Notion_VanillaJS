import DocumentList from './DocumentList.js';
import { request } from './api.js';

export default function MainPage({ target }) {
  const page = document.createElement('div');
  // docList
  const docList = new DocumentList({
    target,
    initialState: [],
  });

  const fetchDocsList = async () => {
    const docs = await request('/');
    docList.setState(docs);
  };

  this.render = async () => {
    await fetchDocsList();
    target.appendChild(page);
  };
}
