import { DocumentsPage, EditPage } from "./pages/index.js";
import {
  request,
  initRouter,
  pushHistory,
  replaceHistory,
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "./service/index.js";
import { IS_OPEN_STORAGE_KEY } from "./constants.js";

export default class App {
  $documentsPage = document.createElement("nav");
  $editPage = document.createElement("main");
  timer = null;

  constructor({ $target }) {
    this.$target = $target;
    this.$target.append(this.$documentsPage);
    this.$target.append(this.$editPage);

    this.render();

    this.route();

    window.addEventListener("popstate", () => this.route());

    initRouter(() => this.route());
  }

  render() {
    this.documentsPage = new DocumentsPage({
      $parent: this.$documentsPage,
      onClickDocumentTitle: (id) => {
        pushHistory(`/documents/${id}`);
      },
      onCreateDocument: async (id) => {
        const document = await request("/documents", {
          method: "POST",
          body: JSON.stringify({
            title: "무제",
            parent: id,
          }),
        });

        const currentOpenStatus = getStorageItem(IS_OPEN_STORAGE_KEY, {});

        setStorageItem(IS_OPEN_STORAGE_KEY, {
          ...currentOpenStatus,
          [id]: true,
        });

        this.documentsPage.setState();
        this.editPage.setState({ id: document.id });
        pushHistory(`/documents/${document.id}`);
      },
      onDeleteDocument: async (id) => {
        await request(`/documents/${id}`, {
          method: "DELETE",
        });

        this.documentsPage.setState();
        this.editPage.setState({ id: "init" });
        replaceHistory("/");
      },
      onToggleDocument: (id) => {
        const currentOpenStatus = getStorageItem(IS_OPEN_STORAGE_KEY, {});

        setStorageItem(IS_OPEN_STORAGE_KEY, {
          ...currentOpenStatus,
          [id]:
            currentOpenStatus[id] === undefined ? true : !currentOpenStatus[id],
        });

        this.documentsPage.setState();
      },
      onClickUserSection: () => {
        pushHistory("/");
      },
    });

    this.editPage = new EditPage({
      $parent: this.$editPage,
      onEditDocument: (id, document) => {
        const documentTempStorageKey = `temp-document-${id}`;

        if (this.timer !== null) {
          clearTimeout(this.timer);
        }

        setStorageItem(documentTempStorageKey, {
          ...document,
          tempSaveDate: new Date(),
        });

        this.timer = setTimeout(async () => {
          await request(`/documents/${id}`, {
            method: "PUT",
            body: JSON.stringify(document),
          });

          removeStorageItem(documentTempStorageKey);
          this.documentsPage.setState();
        }, 1000);
      },
      onClickSubList: (id) => {
        const [, , documentId] = location.pathname.split("/");
        const currentOpenStatus = getStorageItem(IS_OPEN_STORAGE_KEY, {});

        setStorageItem(IS_OPEN_STORAGE_KEY, {
          ...currentOpenStatus,
          [documentId]: true,
        });

        this.documentsPage.setState();
        this.editPage.setState({ id });
        pushHistory(`/document/${id}`);
      },
    });
  }

  route() {
    const { pathname } = location;

    this.documentsPage.setState();

    if (pathname === "/") {
      this.editPage.setState({ id: "init" });
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      this.editPage.setState({ id: documentId });
    }
  }
}
