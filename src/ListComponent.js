import DocumentList from './DocumentList.js';
import { request } from './api.js';
import { updateDocumentTitle } from './router.js';

export default function ListComponent({ target }) {
  const page = document.createElement('div');

  const docList = new DocumentList({
    target,
    initialState: [],
  });

  updateDocumentTitle(async () => {
    await fetchDocsList();
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
