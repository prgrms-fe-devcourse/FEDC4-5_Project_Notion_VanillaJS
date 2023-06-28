import DocumentListItems from "./DocumentListItems.js";
import { request } from "./services/api.js";
import { push } from "./services/router.js";

export default function DocumentList({ $target }) {
  const $listWrapper = document.createElement('nav');
  $listWrapper.className = 'documentListWrapper';
  const $documentList = document.createElement('ul');

  $listWrapper.appendChild($documentList);
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
      new DocumentListItems({
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
          push(`/`);
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

  this.setState();
}