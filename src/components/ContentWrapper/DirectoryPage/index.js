import SideBar from '@components/ContentWrapper/DirectoryPage/SideBar';
import SideBarHeader from '@components/ContentWrapper/DirectoryPage/SideBarHeader';
import './style.css';

export default function DirectoryPage({ $target, initialState }) {
  const $directoryPage = document.createElement('div');
  $directoryPage.className = 'DirectoryPage';
  this.state = initialState;

  $target.appendChild($directoryPage);

  // eslint-disable-next-line no-new
  new SideBarHeader({ $target: $directoryPage });
  const sideBar = new SideBar({ $target: $directoryPage, initialState: this.state });

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    sideBar.setState();
    this.render();
  };

  this.render = () => {};

  $target.appendChild($directoryPage);
}
