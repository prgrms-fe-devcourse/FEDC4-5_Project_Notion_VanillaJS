import DocumentsListItems from "./DocumentsListItems.js";
import { request } from "../../../services/api.js";
import { push, replace } from "../../../services/router.js";
import FolderButton from "../../../components/FolderButton.js";

export default function DocumentsList({ $target }) {
  const $listWrapper = document.createElement('nav');
  $listWrapper.className = 'documentListWrapper';
  const $documentList = document.createElement('ul');
  const $rootDocAddBtn = document.createElement('button');
  $rootDocAddBtn.textContent = '+';
  
  $listWrapper.appendChild($documentList);
  $listWrapper.appendChild($rootDocAddBtn);
  $target.appendChild($listWrapper);

  this.state = [];

  this.setState = async () => {
    const res = await request('/documents');
    this.state = res;
    this.render();
  }

  this.render = () => {
    $documentList.replaceChildren();
    this.state.map((documents) => {
      new DocumentsListItems({
        $target: $documentList,
        documentItems: documents,
        onDocumentAdd: async (parentDocId) => {
          const res = await request('/documents', {
            method: 'POST',
            body: JSON.stringify({
              title: "new document",
              parent: parentDocId
            })
          })
          push(`/documents/${res.id}`);
          this.setState();
        },
        onDocumentDelete: async (docId) => {
          const res = await request(`/documents/${docId}`,{
            method: 'DELETE'
          })
          replace(`/`);
          this.setState();
        }
      });
    });
    
  }

  $documentList.addEventListener('click', event => {
    const $li = event.target.closest('li');
    
    if ($li) {
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    }
  })

  $rootDocAddBtn.addEventListener('click', async () => {
    const res = await request('/documents', {
      method: 'POST',
      body: JSON.stringify({
        title: "new document",
        parent: null
      })
    })
    push(`/documents/${res.id}`);
    this.setState();
  })

  this.setState();
}