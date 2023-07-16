import Page from "../core/Page.js";
import { Editor, DocumentSubList } from "../components/index.js";
import { documentService, documentTempStorage } from "../domain/index.js";
import { INIT_ID } from "../constants/symbol.js";
import { createTarget } from "../service/index.js";

export default class EditPage extends Page {
  INIT_DATA = {
    id: INIT_ID,
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  };
  editor;
  documentSubList;

  constructor({ element, props }) {
    super({ element, props });

    const { onEditDocument, onClickSubList } = this.props;

    this.editor = new Editor({
      element: {
        $parent: this.$target,
        $target: createTarget("div", "editor"),
      },
      props: {
        initialState: this.INIT_DATA,
        onEditDocument,
      },
    });

    this.documentSubList = new DocumentSubList({
      element: {
        $parent: this.$target,
        $target: createTarget("div", "documentSubList"),
      },
      props: {
        initialState: [],
        onClickSubList,
      },
    });
  }

  async reload(nextState) {
    const { id } = nextState;

    if (id !== INIT_ID) {
      const documentData = await documentService.getData(id);
      const documentTempStorageKey = `temp-document-${id}`;
      const { tempSaveDate, title, content } = documentTempStorage(
        documentTempStorageKey
      ).getData();

      if (tempSaveDate && tempSaveDate > documentData.updatedAt) {
        if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
          this.editor.setState({
            ...documentData,
            title,
            content,
          });

          this.render();
          return;
        }
      }

      this.editor.setState(documentData);
      this.documentSubList.setState(documentData);
    } else {
      this.editor.setState(this.INIT_DATA);
      this.documentSubList.setState([]);
    }

    this.render();
  }

  render() {
    this.$parent.append(this.$target);
  }
}
