import { DocumentList, UserSection } from "../components/index.js";
import { request, getStorageItem } from "../service/index.js";
import { insertIsOpen } from "../domain/insertIsOpen.js";
import { IS_OPEN_STORAGE_KEY } from "../constants.js";

export default class DocumentsPage {
  $target = document.createDocumentFragment();

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
    const documents = await request("/documents");
    const currentOpenStatus = getStorageItem(IS_OPEN_STORAGE_KEY, {});

    this.documentList.setState(insertIsOpen(documents, currentOpenStatus));
    this.render();
  }

  render() {
    this.$parent.append(this.$target);
  }
}
