import { getDocument } from '../api';
import Document from '../components/Document';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { proxiedDocuments } from '../domain/proxiedDocuments';
import validateComponent from '../utils/validateComponent';
import { findDocumentPath } from '../domain/findDocumentPath';

export default function EditPage({ targetElement }) {
  validateComponent(this, EditPage);
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.render = async () => {
    const documentId = window.location.pathname.split('/')[2];
    const [documents, documentData] = await Promise.all([proxiedDocuments.documents, getDocument(documentId)]);
    if (!documents || !documentData) return;

    targetElement.innerHTML = `
      <div class="side-bar"></div>
      <div class="edit-page-main">
        <div class="nav-bar"></div>
        <div class="selected-document"></div>
      </div>
    `;
    const sideBarElement = targetElement.querySelector('.side-bar');
    const selectedDocumentElement = targetElement.querySelector('.selected-document');
    const navBarElement = targetElement.querySelector('.nav-bar');

    this.sideBar = new SideBar({ targetElement: sideBarElement, documents });
    this.navBar = new NavBar({
      targetElement: navBarElement,
      documentPath: findDocumentPath(documents, documentData.id),
    });
    this.selectedDocument = new Document({
      targetElement: selectedDocumentElement,
      documentData,
      handleEditTitle: (documentId, title) => {
        const documentTreeElement = document.querySelector(`.document-tree[data-id="${documentId}"]`);
        const documentTitleElement = documentTreeElement.querySelector('.document-blob-title');
        documentTitleElement.textContent = title;
      },
      handleAsyncEditTitle: async () => {
        proxiedDocuments.staleTime = 0;
        const documents = await proxiedDocuments.documents;
        this.sideBar.setState({ ...this.sideBar.state, documents });
      },
    });
  };

  this.init();
}
