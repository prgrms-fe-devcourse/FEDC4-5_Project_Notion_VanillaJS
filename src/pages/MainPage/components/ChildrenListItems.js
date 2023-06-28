export default function ChildrenListItems({ $target, doc }) {
  const isChildDoc = doc.documents.length > 0;
  const $li = document.createElement('li');
  $li.dataset.id = doc.id;
  $target.appendChild($li);
  this.render = () => {
    $li.textContent = doc.title;
    if (isChildDoc) {
      const $ul = document.createElement('ul');
      doc.documents.map((childDoc) => {
        new ChildrenListItems({
          $target: $ul,
          doc: childDoc
        })
      })
      $target.appendChild($ul);
    }
  }

  this.render();
}