import { DocumentList, UserSection } from "../components/index.js";
import {
  insertIsOpen,
  documentService,
  openStatusStorage,
} from "../domain/index.js";

export default class DocumentsPage {
  $parent;
  $target = document.createDocumentFragment();
  documentList;

  constructor({
    $parent,
    onClickDocumentTitle,
    onCreateDocument,
    onDeleteDocument,
    onToggleDocument,
    onClickUserSection,
  }) {
    this.$parent = $parent;

    new UserSection({
      element: {
        $parent: this.$target,
        $target: document.createElement("div"),
        className: "userSection",
      },
      props: {
        onClickUserSection,
      },
    });

    this.documentList = new DocumentList({
      element: {
        $parent: this.$target,
        $target: document.createElement("div"),
        className: "documentList",
      },
      initialState: [],
      props: {
        onClickDocumentTitle,
        onCreateDocument,
        onDeleteDocument,
        onToggleDocument,
      },
    });
  }

  async setState() {
    const documents = await documentService.getDataList();
    const currentOpenStatus = openStatusStorage.getData();

    this.documentList.setState(insertIsOpen(documents, currentOpenStatus));
    this.render();
  }

  render() {
    this.$parent.append(this.$target);
  }
}
