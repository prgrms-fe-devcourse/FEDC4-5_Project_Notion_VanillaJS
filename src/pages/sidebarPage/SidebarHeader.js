import { push } from '../../domain/router';
import { validateComponent } from '../../utils/validation';

export default function SidebarHeader({ $target, initialState }) {
  validateComponent(new.target);

  const $sidebarHeader = document.createElement('div');
  $sidebarHeader.classList.add('sidebar-header');
  $target.appendChild($sidebarHeader);

  this.state = initialState;

  this.render = () => {
    const { user } = this.state;
    $sidebarHeader.innerHTML = `
      <div class="user">
        <h2 class="user-notion">📝 ${user}의 노션</h2>
      </div>
    `;
  };

  this.render();

  $sidebarHeader.addEventListener('click', () => {
    push('/');
  });
}
