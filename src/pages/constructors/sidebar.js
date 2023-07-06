import { navigate } from '../../router/utils.js';
import { addDocument, removeDocument } from '../../apis/api.js';
import { Sidebar } from '../../components/index.js';

export default function createSidebar() {
  const { $target, documentStore, editorStore } = this;

  return new Sidebar({
    $target: $target.querySelector('.sidebar'),
    initialState: {
      documents: documentStore.state.documents,
      openedDocuments: documentStore.state.openedDocuments,
      currentDocumentId: editorStore.state.documentId,
    },
    onAppend: async (id) => {
      this.documentStore.setOpened(id, true);

      const newDocument = await addDocument('', id);
      await documentStore.fetchDocuments();

      navigate(`/documents/${newDocument.id}`);
      this.render();
    },
    onRemove: async (id) => {
      await removeDocument(id);
      await documentStore.fetchDocuments();
      editorStore.setState({ ...editorStore.state, documentId: 0 });
      this.render();
    },
    onNavigate: (id) => navigate(`/documents/${id}`),
    onToggleOpened: (id) => {
      this.documentStore.setOpened(id, !this.documentStore.state.openedDocuments[id]);
      this.render();
    },
  });
}
