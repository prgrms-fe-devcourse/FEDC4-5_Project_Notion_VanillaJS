export default function ListHeader({ $target, onNewDocument }) {
  const $header = document.createElement('div');
  $header.className = 'sidebar_header';

  $target.appendChild($header);
  this.render = () => {
    const $userInfo = document.createElement('h3');
    $userInfo.textContent = 'Notion 과제중...';

    const $newDocument = document.createElement('div');
    $newDocument.className = 'sidebar_newDocument';
    $newDocument.textContent = '새 페이지';

    $header.append($userInfo, $newDocument);

    $newDocument.addEventListener('click', (e) => {
      onNewDocument();
    });
  };
  this.render();
}
