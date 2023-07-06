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
    new DocumentsListItems({
      $target: $documentList,
      documentItems: this.state,
      reRender: this.setState
    });
  };

  this.setState();
}
