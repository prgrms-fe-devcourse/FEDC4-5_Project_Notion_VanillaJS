import SideBar from '@components/ContentWrapper/DirectoryPage/SideBar';
import SideBarHeader from '@components/ContentWrapper/DirectoryPage/SideBarHeader';
import { openSideBar, closeSideBar, getSideBarState } from '@utils/sidebarUI';
import './style.css';

export default function DirectoryPage({ $target, initialState }) {
  const $directoryPage = document.createElement('div');
  $directoryPage.className = 'DirectoryPage';
  this.state = initialState;

  $target.appendChild($directoryPage);

  const onClose = () => {
    closeSideBar();
    this.setState();
  };

  const onOpen = () => {
    openSideBar();
    this.setState();
  };
  new SideBarHeader({ $target: $directoryPage, onClose, onOpen });
  const sideBar = new SideBar({ $target: $directoryPage, initialState: this.state });

  this.setState = (nextState) => {
    this.state = nextState;
    sideBar.setState();
    this.render();
  };

  this.render = () => {
    if (getSideBarState()) {
      sideBar.show();
    } else {
      sideBar.hide();
    }
  };

  $target.appendChild($directoryPage);
}
