import { findDocument } from '../../helpers/documentHelper.js';
import { ChildDocumentLinks } from '../../components/index.js';

export default function createChildDocumentLinks() {
  const { $target, documentStore, editorStore } = this;

  return new ChildDocumentLinks({
    $target: $target.querySelector('.main__child-document-links'),
    initialState: {
      documents: findDocument(editorStore.state.documentId, documentStore.state.documents)?.documents || [],
    },
  });
}
