import { getDocumentList } from "/src/service/documentListService.js";
import Navbar from "/src/component/Navbar.js";
import NavHeader from "/src/component/NavHeader.js";
import { toggleDataStorage } from "/src/storage.js";
import { recursiveInitToggleData } from "/src/helper/toggleHelper.js";

function NavPage({
  $app,
  initialState,
  handleSelect,
  handleCreate,
  handleDelete,
  handleToggle,
  handleGoHome,
}) {
  const $navPage = document.createElement("nav");
  $app.appendChild($navPage);

  this.state = initialState;

  this.setState = async nextState => {
    const documentList = await getDocumentList();
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
      user: "cszzi",
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
