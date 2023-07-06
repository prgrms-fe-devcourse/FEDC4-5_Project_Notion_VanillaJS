export default function DocumentListTitle({ $parent, onClickTitle }) {
  const $documentListTitle = document.createElement('div');
  $documentListTitle.classList.add('documentList-title');
  $documentListTitle.style.cursor = 'pointer';
  $parent.appendChild($documentListTitle);

  this.render = () => {
    $documentListTitle.innerHTML = `
      <img alt="노션 아이콘이미지" src='/src/assets/icons8-notion-48.png'/>
      <div>주연의 Notion</div>
    `;
  };

  this.render();
  $documentListTitle.addEventListener('click', onClickTitle);
}
