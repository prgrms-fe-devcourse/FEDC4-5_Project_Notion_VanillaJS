export default function DocumentList({
  $target,
  initialState,
  onSelectDocument,
  onCreateDocument,
  onRemoveDocument,
}) {
  const $list = document.createElement('div');
  $list.className = 'document_list';
  $target.appendChild($list);

  if (Array.isArray(initialState)) {
    this.state = initialState;
  }
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    const $ul = document.createElement('ul');

    this.state.map((documentInfo) => {
      const $li = document.createElement('li');
      $li.className = 'document_li';
      $li.setAttribute('data-id', documentInfo.id);

      const $title = document.createElement('span');
      $title.textContent = documentInfo.title;
      $title.className = 'title';
      $li.appendChild($title);

      const $createBtn = document.createElement('button');
      $createBtn.textContent = '+';
      $createBtn.className = 'createBtn';
      $li.appendChild($createBtn);

      const $removeBtn = document.createElement('button');
      $removeBtn.textContent = '-';
      $removeBtn.className = 'removeBtn';
      $li.appendChild($removeBtn);

      if (documentInfo.documents.length > 0) {
        new DocumentList({
          $target: $li,
          initialState: documentInfo.documents,
        });
      }
      $ul.appendChild($li);
    });
    $list.replaceChildren($ul);

    $ul.addEventListener('click', (e) => {
      const $li = e.target.closest('li');
      if ($li !== null) {
        const documentId = $li.dataset.id;

        // document 선택
        if (e.target.className === 'title') {
          onSelectDocument(documentId);
        }
        //하위 document 생성
        if (e.target.className === 'createBtn') {
          onCreateDocument(documentId);
        }
        // document 삭제
        else if (e.target.className === 'removeBtn') {
          onRemoveDocument(documentId);
        }
      }
    });
  };
  this.render();
}
