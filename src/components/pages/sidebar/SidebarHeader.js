import { push } from '../../../utils/router.js';

export default function SidebarHeader({ $target }) {
  const $header = document.createElement('div');
  $header.className = 'header';
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <span class="header-name">종현의 Notion</span>
    `;
  };

  this.render();

  $header.addEventListener('click', () => {
    push('/');
  });
}
