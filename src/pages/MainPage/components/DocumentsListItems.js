import DirItem from "../../../components/DirItem.js";
import DocItem from "../../../components/DocItem.js";

export default function DocumentsListItems({ $target, documentItems, onDocumentAdd, onDocumentDelete, reRender }) {
  this.render = () => {
    documentItems.forEach(item => {
      const itemType = item.title.split('/')[0];
      if (itemType === 'dir') {
        new DirItem({
          $target,
          dirName: item.title.split('/').slice(1).join('/'),
          id: item.id,
          reRender,
        })
        const $ul = document.createElement('ul');
        $target.appendChild($ul);
        new DocumentsListItems({
          $target: $ul,
          documentItems: item.documents,
          onDocumentAdd,
          onDocumentDelete,
          reRender
        })
      } else {
        new DocItem({
          $target,
          item,
          reRender
        })
      }
    });
  };

  this.render();
}