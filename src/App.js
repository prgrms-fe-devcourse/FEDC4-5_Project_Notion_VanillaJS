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
import { initRouter, push } from "/src/router.js";
import NavPage from "/src/page/NavPage.js";
import EditPage from "/src/page/EditPage.js";

function App({ $app }) {
  const navPage = new NavPage({
    $app,
    initialState: { documentList: [], toggleData: [] },

    handleSelect: id => {
      navPage.state.selected = id;
      push(`/documents/${id}`);
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

  let timer = null;
  const DEBOUNCE = 1000;
  const editPage = new EditPage({
    $app,
    handleEdit: ({ id, ...document }) => {
      if (timer !== null) clearTimeout(timer);

      timer = setTimeout(async () => {
        saveDocument(id, document);
        await editDocument(id, document);
        removeDocument(id);
        navPage.setState();
      }, DEBOUNCE);
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    navPage.setState();
    if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");
      editPage.setState({ id });
    }
  };

  this.route();
  window.addEventListener("popstate", () => this.route());
  initRouter(() => this.route());
}

export default App;
