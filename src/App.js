import { DocumentsPage, EditPage } from "./pages/index.js";
import { initRouter, pushHistory, replaceHistory } from "./service/index.js";
import {
  documentService,
  openStatusStorage,
  documentTempStorage,
} from "./domain/index.js";

export default class App {
  $target;
  $children = {
    documentsPage: document.createElement("nav"),
    editPage: document.createElement("main"),
  };
  timer = null;
  documentsPage;
  editPage;

  constructor({ $target }) {
    this.$target = $target;
    this.$target.append(this.$children.documentsPage);
    this.$target.append(this.$children.editPage);

    this.render();

    this.route();

    initRouter(() => this.route());
  }

  render() {
    this.documentsPage = new DocumentsPage({
      $parent: this.$children.documentsPage,
      onClickDocumentTitle: (id) => {
        pushHistory(`/documents/${id}`);
      },
      onCreateDocument: async (id) => {
        const document = await documentService.addData({
          id,
          title: "무제",
        });

        const currentOpenStatus = openStatusStorage.getData();

        openStatusStorage.setData({
          ...currentOpenStatus,
          [id]: true,
        });

        this.documentsPage.setState();
        this.editPage.setState({ id: document.id });
        pushHistory(`/documents/${document.id}`);
      },
      onDeleteDocument: async (id) => {
        await documentService.deleteData(id);

        this.documentsPage.setState();
        this.editPage.setState({ id: "init" });
        replaceHistory("/");
      },
      onToggleDocument: (id) => {
        const currentOpenStatus = openStatusStorage.getData();

        openStatusStorage.setData({
          ...currentOpenStatus,
          [id]: !currentOpenStatus[id],
        });

        this.documentsPage.setState();
      },
      onClickUserSection: () => {
        pushHistory("/");
      },
    });

    this.editPage = new EditPage({
      $parent: this.$children.editPage,
      onEditDocument: (id, document) => {
        const documentTempStorageKey = `temp-document-${id}`;

        if (this.timer !== null) {
          clearTimeout(this.timer);
        }

        documentTempStorage(documentTempStorageKey).setData({
          ...document,
          tempSaveDate: new Date(),
        });

        this.timer = setTimeout(async () => {
          await documentService.updateData(id, document);

          documentTempStorage(documentTempStorageKey).removeData();
          this.documentsPage.setState();
        }, 1000);
      },
      onClickSubList: (id) => {
        const [, , documentId] = location.pathname.split("/");
        const currentOpenStatus = openStatusStorage.getData();

        openStatusStorage.setData({
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
