import { request } from '../../api.js';
import DocumentList from './DocumentList.js';
export default function DocumentListPage({
  $target,
  onSelectDocument,
  onCreateDocument,
  onRemoveDocument,
}) {
  const $page = document.createElement('div');
  $target.appendChild($page);

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onSelectDocument,
    onCreateDocument,
    onRemoveDocument,
  });

  this.setState = async () => {
    const documents = await request('/documents');
    documentList.setState(documents);
  };
}
