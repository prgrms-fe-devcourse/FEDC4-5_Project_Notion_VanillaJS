import { DocumentsPage, EditPage } from "./pages/index.js";
import { initRouter, pushHistory, replaceHistory } from "./service/index.js";
import {
  documentService,
  openStatusStorage,
  documentTempStorage,
  pagesReloader,
} from "./domain/index.js";
import { getEditPageByPath } from "./domain/index.js";
import { INIT_ID, ROOT_PATH, DOCUMENTS_PATH } from "./constants/index.js";

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

  get documentId() {
    const { pathname } = location;
    const [, , documentId] = pathname.split("/");

    return documentId;
  }

  render() {
    this.documentsPage = new DocumentsPage({
      element: {
        $parent: this.$children.documentsPage,
        $target: document.createDocumentFragment(),
      },
      props: {
        onClickDocumentTitle: (id) => {
          pushHistory(`${DOCUMENTS_PATH}${id}`);
        },
        onCreateDocument: async (id) => {
          const documentData = await documentService.addData({
            id,
            title: "무제",
          });

          const currentOpenStatus = openStatusStorage.getData();

          openStatusStorage.setData({
            ...currentOpenStatus,
            [id]: true,
          });

          pagesReloader(
            { page: this.documentsPage },
            { page: this.editPage, arg: { id: documentData.id } }
          );
          pushHistory(`${DOCUMENTS_PATH}${documentData.id}`);
        },
        onDeleteDocument: async (id) => {
          await documentService.deleteData(id);

          pagesReloader(
            { page: this.documentsPage },
            { page: this.editPage, arg: { id: INIT_ID } }
          );
          replaceHistory(ROOT_PATH);
        },
        onToggleDocument: (id) => {
          const currentOpenStatus = openStatusStorage.getData();

          openStatusStorage.setData({
            ...currentOpenStatus,
            [id]: !currentOpenStatus[id],
          });

          pagesReloader({ page: this.documentsPage });
        },
        onClickUserSection: () => {
          pushHistory(ROOT_PATH);
        },
      },
    });

    this.editPage = new EditPage({
      element: {
        $parent: this.$children.editPage,
        $target: document.createDocumentFragment(),
      },
      props: {
        onEditDocument: (id, documentData) => {
          const documentTempStorageKey = `temp-document-${id}`;

          if (this.timer !== null) {
            clearTimeout(this.timer);
          }

          documentTempStorage(documentTempStorageKey).setData({
            ...documentData,
            tempSaveDate: new Date(),
          });

          this.timer = setTimeout(async () => {
            await documentService.updateData(id, documentData);

            documentTempStorage(documentTempStorageKey).removeData();
            pagesReloader({ page: this.documentsPage });
          }, 1000);
        },
        onClickSubList: (id) => {
          const currentOpenStatus = openStatusStorage.getData();

          openStatusStorage.setData({
            ...currentOpenStatus,
            [this.documentId]: true,
          });

          pagesReloader(
            { page: this.documentsPage },
            { page: this.editPage, arg: { id } }
          );
          pushHistory(`${DOCUMENTS_PATH}${id}`);
        },
      },
    });
  }

  route() {
    const { pathname } = location;
    const editPageId = getEditPageByPath(pathname, this.documentId);

    pagesReloader(
      { page: this.documentsPage },
      { page: this.editPage, arg: { id: editPageId } }
    );
  }
}
