export default function DocumentList({ $target, initialState }) {
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

      const $title = document.createElement('span');
      $title.textContent = documentInfo.title;
      $title.setAttribute('data-id', documentInfo.id);
      $li.appendChild($title);

      const $newBtn = document.createElement('button');
      $newBtn.textContent = '+';
      $li.appendChild($newBtn);

      if (documentInfo.documents.length > 0) {
        new DocumentList({
          $target: $li,
          initialState: documentInfo.documents,
        });
      }
      $ul.appendChild($li);
    });
    $list.appendChild($ul);
    $ul.addEventListener('click', (e) => {
      const $title = e.target.closest('span');
      console.log($title);
      const { id } = $title.dataset;
      console.log(id);
    });
  };
  this.render();
}
