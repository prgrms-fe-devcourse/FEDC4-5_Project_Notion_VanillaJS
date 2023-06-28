export default function DocumentListItems({ $target, documentItems, onDocumentAdd, onDocumentDelete }) {
  const isChildDoc = documentItems.documents.length > 0;
  
  this.render = () => {
    const $li = document.createElement('li');
    const $liTitle = document.createElement('div');
    const $buttonWrapper = document.createElement('div');
    const $liAddButton = document.createElement('button');
    const $liDelButton = document.createElement('button');
    
    $liTitle.textContent = documentItems.title;
    $liTitle.className = 'listTitle';
    $li.dataset.id = documentItems.id;
    $liAddButton.textContent = '+';
    $liDelButton.textContent = '-';
    $liAddButton.className = 'docAddBtn';
    $liDelButton.className = 'docDelBtn';
    $buttonWrapper.className = 'docBtnWrapper'

    $buttonWrapper.append($liAddButton, $liDelButton);
    $li.append($liTitle, $buttonWrapper)
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