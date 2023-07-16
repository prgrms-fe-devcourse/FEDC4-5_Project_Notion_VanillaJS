import {
  createToggleItem,
  updateToggleItem,
  deleteToggleItem,
} from "/src/helper/toggleHelper.js";
import NavPage from "/src/page/NavPage.js";
import EditPage from "/src/page/EditPage.js";

import { HistoryRouter } from "./router.js";
import {
  saveDocumentStorage,
  clearDocumentStorage,
  requestEditDocument,
} from "./service/documentEditService.js";
import {
  requestCreateDocument,
  requestDeleteDocument,
} from "./service/documentListService.js";

function App({ $app }) {
  const router = new HistoryRouter();
  const navPage = new NavPage({
    $app,
    initialState: { documentList: [], toggleData: [] },

    handleSelect: id => {
      navPage.state.selected = id;
      router.push(`/documents?id=${id}`);
    },

    handleCreate: async parent => {
      const newDocument = await requestCreateDocument(
        parent
      );
      const nextToggleData = createToggleItem({
        data: navPage.state.toggleData,
        id: newDocument.id,
        parent,
      });
      navPage.state.selected = newDocument.id;
      navPage.setState({ toggleData: nextToggleData });
      router.push(`/documents?id=${newDocument.id}`);
    },

    handleDelete: async id => {
      await requestDeleteDocument(id);
      const nextToggleData = deleteToggleItem({
        data: navPage.state.toggleData,
        id,
      });
      navPage.setState({ toggleData: nextToggleData });
      if (editPage.state.id == id) {
        router.replace("/");
      }
    },

    handleToggle: id => {
      const nextToggleData = updateToggleItem({
        data: navPage.state.toggleData,
        id,
      });
      navPage.setState({ toggleData: nextToggleData });
    },

    handleGoHome: () => router.push("/"),
  });

  let timer = null;
  const DEBOUNCE = 1000;
  const editPage = new EditPage({
    $app,
    handleEdit: ({ id, emoji, title, content }) => {
      if (timer !== null) clearTimeout(timer);

      timer = setTimeout(async () => {
        const document = {
          title: emoji + " " + title,
          content,
        };
        saveDocumentStorage(id, document);
        await requestEditDocument(id, document);
        clearDocumentStorage(id);
        navPage.setState();
      }, DEBOUNCE);
    },
  });

  this.route = () => {
    console.log(router.getQuery(), router.getUrl());
    const currentUrl = router.getUrl();
    navPage.setState();

    if (currentUrl === "/") {
      editPage.setState({ id: null });
      navPage.state.selected = null;
    } else {
      const { id } = router.getQuery();
      editPage.setState({ id });
    }
  };

  this.route();
  router.observe(this.route);
}

export default App;
