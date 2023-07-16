import Page from "../core/Page.js";
import { DocumentList, UserSection } from "../components/index.js";
import {
  insertIsOpen,
  documentService,
  openStatusStorage,
} from "../domain/index.js";
import { createTarget } from "../service/index.js";

export default class DocumentsPage extends Page {
  documentList;

  constructor({ element, props }) {
    super({ element, props });

    const {
      onClickUserSection,
      onClickDocumentTitle,
      onCreateDocument,
      onDeleteDocument,
      onToggleDocument,
    } = this.props;

    new UserSection({
      element: {
        $parent: this.$target,
        $target: createTarget("div", "userSection"),
      },
      props: {
        onClickUserSection,
      },
    });

    this.documentList = new DocumentList({
      element: {
        $parent: this.$target,
        $target: createTarget("div", "documentList"),
      },
      props: {
        initialState: [],
        onClickDocumentTitle,
        onCreateDocument,
        onDeleteDocument,
        onToggleDocument,
      },
    });
  }

  async reload() {
    const documents = await documentService.getDataList();
    const currentOpenStatus = openStatusStorage.getData();

    this.documentList.setState(insertIsOpen(documents, currentOpenStatus));
    this.render();
  }
}
