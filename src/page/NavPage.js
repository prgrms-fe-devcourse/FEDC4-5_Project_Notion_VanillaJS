import { getDocumentList } from "/src/service/documentListService.js";
import Navbar from "/src/component/Navbar.js";
import { toggleDataStorage } from "/src/storage.js";
import { recursiveInitToggleData } from "/src/helper/toggleHelper.js";

function NavPage({
  $app,
  initialState,
  handleSelect,
  handleCreate,
  handleDelete,
  handleToggle,
}) {
  const $navPage = document.createElement("nav");
  $app.appendChild($navPage);

  this.state = initialState;
  this.setState = async nextToggleData => {
    const documentList = await getDocumentList();
    if (nextToggleData) {
      toggleDataStorage.setItem(nextToggleData);
    }
    this.state = {
      ...this.state,
      documentList,
      toggleData:
        toggleDataStorage.getItem() ||
        recursiveInitToggleData(documentList),
    };
    navbar.setState(this.state);
  };

  const navbar = new Navbar({
    $page: $navPage,
    initialState: this.state,
    onCreate: id => handleCreate(id),
    onToggle: id => handleToggle(id),
    onSelect: id => handleSelect(id),
    onDelete: id => handleDelete(id),
  });
}

export default NavPage;
