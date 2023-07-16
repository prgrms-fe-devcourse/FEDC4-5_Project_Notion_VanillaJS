import { DocumentsPage, EditPage } from "./pages/index.js";
import { initRouter, pushHistory, replaceHistory } from "./service/index.js";
import {
  documentService,
  openStatusStorage,
  documentTempStorage,
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

          this.documentsPage.reload();
          this.editPage.reload({ id: documentData.id });
          pushHistory(`${DOCUMENTS_PATH}${documentData.id}`);
        },
        onDeleteDocument: async (id) => {
          await documentService.deleteData(id);

          this.documentsPage.reload();
          this.editPage.reload({ id: INIT_ID });
          replaceHistory(ROOT_PATH);
        },
        onToggleDocument: (id) => {
          const currentOpenStatus = openStatusStorage.getData();

          openStatusStorage.setData({
            ...currentOpenStatus,
            [id]: !currentOpenStatus[id],
          });

          this.documentsPage.reload();
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
            this.documentsPage.reload();
          }, 1000);
        },
        onClickSubList: (id) => {
          const currentOpenStatus = openStatusStorage.getData();

          openStatusStorage.setData({
            ...currentOpenStatus,
            [this.documentId]: true,
          });

          this.documentsPage.reload();
          this.editPage.reload({ id });
          pushHistory(`${DOCUMENTS_PATH}${id}`);
        },
      },
    });
  }

  route() {
    const { pathname } = location;
    const editPageId = getEditPageByPath(pathname, this.documentId);

    this.documentsPage.reload();
    this.editPage.reload({ id: editPageId });
  }
}
