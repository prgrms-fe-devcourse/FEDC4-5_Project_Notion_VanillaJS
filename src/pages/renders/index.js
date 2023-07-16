import { findDocumentRoute, findDocument } from '../../helpers/documentHelper.js';

export function renderEditor() {
  const { editor, editorStore } = this;

  editor.setState({
    documentId: editorStore.state.documentId,
    document: editorStore.state.document,
  });
}

export function renderSidebar() {
  const { sidebar } = this;
  const { documentStore, editorStore } = this;

  sidebar.setState({
    documents: documentStore.state.documents,
    openedDocuments: documentStore.state.openedDocuments,
    currentDocumentId: editorStore.state.documentId,
  });
}

export function renderBreadcrumb() {
  const { breadcrumb } = this;
  const { editorStore, documentStore } = this;

  breadcrumb.setState({ routes: findDocumentRoute(editorStore.state.documentId, documentStore.state.documents) });
}

export function renderStyleMenu() {
  const { styleMenu } = this;

  styleMenu.setState({ ...styleMenu.state, isShowMenu: false, isShowTextMenu: false });
}

export function renderChildDocumentLinks() {
  const { childDocumentLinks } = this;
  const { documentStore, editorStore } = this;

  childDocumentLinks.setState({
    documents: findDocument(editorStore.state.documentId, documentStore.state.documents)?.documents || [],
  });
}
