export default function SidebarFooter({ $target, createRootDocument }) {
  const $footer = document.createElement('div');
  $footer.className = 'footer';
  $target.appendChild($footer);

  this.render = () => {
    $footer.innerHTML = `
      <i class="fa-solid fa-plus fa-xs" style="color: #9a9a9a; margin-right:3px"></i>
      <span class="create-root-document" style="color: #9a9a9a;">페이지 추가</span>
    `;
  };

  this.render();

  $footer.addEventListener('click', (e) => {
    const { target } = e;

    if (
      target.className === 'footer' ||
      target.className === 'create-root-document' ||
      target.className === 'fa-solid fa-plus fa-xs'
    )
      createRootDocument();
  });
}
