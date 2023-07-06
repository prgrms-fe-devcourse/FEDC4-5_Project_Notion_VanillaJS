import './style.css';

export default function SideBarHeader({ $target, onClose, onOpen }) {
  const $sideBarHeader = document.createElement('header');
  $sideBarHeader.className = 'SideBarHeader';

  $target.appendChild($sideBarHeader);

  $sideBarHeader.innerHTML = `
    <div class="SideBarButton SideBarCloseButton">
      ⏎
    </div>
    <div class="SideBarButton SideBarOpenButton ButtonHide">
      ☰
    </div>
  `;
  $sideBarHeader.addEventListener('click', ({ target }) => {
    if (target.classList.contains('SideBarCloseButton')) {
      onClose();
      document.querySelector('.SideBarOpenButton').classList.remove('ButtonHide');
      document.querySelector('.SideBarCloseButton').classList.add('ButtonHide');
    } else if (target.classList.contains('SideBarOpenButton')) {
      onOpen();
      document.querySelector('.SideBarCloseButton').classList.remove('ButtonHide');
      document.querySelector('.SideBarOpenButton').classList.add('ButtonHide');
    }
  });
}
