import {
  createToggleItem,
  updateToggleItem,
  deleteToggleItem,
} from "/src/helper/toggleHelper.js";
import {
  createDocument,
  deleteDocument,
} from "/src/service/documentListService.js";
import {
  fetchDocument,
  saveDocument,
  removeDocument,
  editDocument,
} from "/src/service/documentEditService.js";
import NavPage from "/src/page/NavPage.js";

function App({ $app }) {
  const navPage = new NavPage({
    $app,
    initialState: { documentList: [], toggleData: [] },
    handleSelect: id => {
      navPage.state.selected = id;
      console.log(id);
    },

    handleCreate: async parent => {
      const newDocument = await createDocument(parent);
      const nextToggleData = createToggleItem({
        data: navPage.state.toggleData,
        id: newDocument.id,
        parent,
      });
      navPage.setState(nextToggleData);
      // handleSelect(newDocument.id);
    },

    handleDelete: async id => {
      await deleteDocument(id);
      const nextToggleData = deleteToggleItem({
        data: navPage.state.toggleData,
        id,
      });
      navPage.setState(nextToggleData);
    },

    handleToggle: id => {
      const nextToggleData = updateToggleItem({
        data: navPage.state.toggleData,
        id,
      });
      navPage.setState(nextToggleData);
    },
  });

  this.route = () => {
    navPage.setState();
  };

  this.route();
}

export default App;
