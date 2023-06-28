export default function DocumentListItems({ $target, documentItems, onDocumentAdd, onDocumentDelete }) {
  const isChildDoc = documentItems.documents.length > 0;
  
  this.render = () => {
    const $li = document.createElement('li');
    const $liContent = document.createElement('div');
    const $liTitle = document.createElement('span');
    const $liAddButton = document.createElement('button');
    const $liDelButton = document.createElement('button');
    const $buttonWrapper = document.createElement('span');

    $liTitle.textContent = documentItems.title;
    $li.dataset.id = documentItems.id;
    $liAddButton.textContent = '+';
    $liDelButton.textContent = '-';
    $liAddButton.className = 'docAddBtn';
    $liDelButton.className = 'docDelBtn';

    $buttonWrapper.append($liAddButton, $liDelButton);

    $liContent.appendChild($liTitle);
    $liContent.appendChild($buttonWrapper);
    $li.appendChild($liContent);
    $target.appendChild($li);

    $buttonWrapper.addEventListener('click', event => {
      event.stopPropagation();
      const $li = event.target.closest('li');
      const targetClassName = event.target.className;

      if ($li) {
        const { id } = $li.dataset;
        if (targetClassName === 'docAddBtn'){
          onDocumentAdd(id);
        } else if (targetClassName === 'docDelBtn') {
          onDocumentDelete(id);
        }
        
      }
    })

    // 자식 documents 여부 확인
    if (isChildDoc) {
      const $ul = document.createElement('ul');
      documentItems.documents.map((childDoc) => {
        new DocumentListItems({
          $target: $ul,
          documentItems: childDoc,
          onDocumentAdd,
          onDocumentDelete,
        })
      })

      $target.appendChild($li);
      $target.appendChild($ul);
    }
  };

  this.render();
}