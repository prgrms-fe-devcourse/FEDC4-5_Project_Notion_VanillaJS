import DocumentsListItems from "./DocumentsListItems.js";
import { request } from "../../../services/api.js";
import { push, replace } from "../../../services/router.js";
import DirItem from "../../../components/DirItem.js";

export default function DocumentsList({ $target }) {
  this.state = [];

  this.setState = async () => {
    const res = await request('/documents');
    this.state = res;
    this.render();
  };

  const $listWrapper = document.createElement('nav');
  $listWrapper.className = 'documentListWrapper';
  const $documentList = document.createElement('ul');
  new DirItem({ $target: $listWrapper, dirName: '/root', reRender: this.setState });
  $listWrapper.appendChild($documentList);
  $target.appendChild($listWrapper);

  const handleDocumentClick = (event) => {
    const $li = event.target.closest('li');
    if ($li) {
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    }
  };

  $documentList.addEventListener('click', handleDocumentClick);


  this.render = () => {
    $documentList.innerHTML = '';
    // this.state.forEach((documents) => {
    //   new DocumentsListItems({
    //     $target: $documentList,
    //     documentItems: documents,
    //     onDocumentAdd: async (parentDocId) => {
    //       const res = await request('/documents', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //           title: "new document",
    //           parent: parentDocId
    //         })
    //       });
    //       push(`/documents/${res.id}`);
    //       this.setState();
    //     },
    //     onDocumentDelete: async (docId) => {
    //       const res = await request(`/documents/${docId}`, {
    //         method: 'DELETE'
    //       });
    //       replace(`/`);
    //       this.setState();
    //     }
    //   });
    // });
    new DocumentsListItems({
      $target: $documentList,
      documentItems: this.state,
      onDocumentAdd: async (parentDocId) => {
        const res = await request('/documents', {
          method: 'POST',
          body: JSON.stringify({
            title: "new document",
            parent: parentDocId
          })
        });
        push(`/documents/${res.id}`);
        this.setState();
      },
      onDocumentDelete: async (docId) => {
        const res = await request(`/documents/${docId}`, {
          method: 'DELETE'
        });
        replace(`/`);
        this.setState();
      },
      reRender: this.setState
    });
  };

  this.setState();
}
