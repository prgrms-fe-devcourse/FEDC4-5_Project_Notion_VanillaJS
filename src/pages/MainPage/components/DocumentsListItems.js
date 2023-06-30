export default function DocumentsListItems({ $target, documentItems, onDocumentAdd, onDocumentDelete }) {
  const isChildDoc = documentItems.documents.length > 0;
  
  this.render = () => {
    const $li = document.createElement('li');
    const $liTitle = document.createElement('div');
    const $buttonWrapper = document.createElement('div');
    const $liAddButton = document.createElement('i');
    const $liDelButton = document.createElement('i');
    
    $liTitle.textContent = documentItems.title;
    $liTitle.className = 'listTitle';
    $li.dataset.id = documentItems.id;
    $liAddButton.classList.add('fa-solid', 'fa-plus', 'docAddBtn');
    $liDelButton.classList.add('fa-solid', 'fa-trash', 'docDelBtn');
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
        if (targetClassName.includes('docAddBtn')){
          onDocumentAdd(id);
        } else if (targetClassName.includes('docDelBtn')) {
          // console.log(event.target);
          event.target.className = "fa-solid fa-spinner";
          onDocumentDelete(id);
        }
        
      }
    })

    // 자식 documents 여부 확인
    if (isChildDoc) {
      const $ul = document.createElement('ul');
      documentItems.documents.map((childDoc) => {
        new DocumentsListItems({
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