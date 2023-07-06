import { request } from '../../api.js';
import DocumentList from './DocumentList.js';
export default function DocumentListPage({ $target }) {
  const $page = document.createElement('div');

  const fetchDocument = async () => {
    const documents = await request('/documents');
    console.log(documents);
    return documents;
  };

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
  });

  this.setState = async () => {};
  this.render = async () => {
    const documents = await fetchDocument();
    documentList.setState(documents);
    $target.appendChild($page);
  };
}
