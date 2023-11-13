import { requestGetDocumentList } from '../service/documentListService.js';
import Navbar from '../component/Navbar.js';
import NavHeader from '../component/NavHeader.js';
import { toggleDataStorage } from '../storage.js';
import { recursiveInitToggleData } from '../helper/toggleHelper.js';

function NavPage({
  $app,
  initialState,
  handleSelect,
  handleCreate,
  handleDelete,
  handleToggle,
  handleGoHome,
}) {
  const $navPage = document.createElement('nav');
  $app.appendChild($navPage);

  this.state = initialState;

  this.setState = async (nextState) => {
    const documentList = await requestGetDocumentList();
    const toggleData = nextState
      ? nextState.toggleData
      : toggleDataStorage.getItem() ||
        recursiveInitToggleData(documentList);
    this.state = {
      ...this.state,
      documentList,
      toggleData,
    };
    toggleDataStorage.setItem(toggleData);
    navbar.setState(this.state);
  };

  const navHeader = new NavHeader({
    $page: $navPage,
    initialState: {
      user: 'cszzi',
    },
    onCreate: () => handleCreate(null),
    onGoHome: handleGoHome,
  });

  const navbar = new Navbar({
    $page: $navPage,
    initialState: this.state,
    onCreate: handleCreate,
    onToggle: handleToggle,
    onSelect: handleSelect,
    onDelete: handleDelete,
  });
}

export default NavPage;
