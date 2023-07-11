import { Editor, DocumentSubList } from "../components/index.js";
import { documentService } from "../domain/index.js";
import { getStorageItem } from "../service/index.js";

export default class EditPage {
  $parent;
  $target = document.createDocumentFragment();
  editor;
  documentSubList;

  constructor({ $parent, onEditDocument, onClickSubList }) {
    this.$parent = $parent;

    this.editor = new Editor({
      element: {
        $parent: this.$target,
        $target: document.createElement("div"),
        className: "editor",
      },
      initialState: {
        id: "init",
        title: "",
        content: "",
        createdAt: "",
        updatedAt: "",
      },
      props: {
        onEditDocument,
      },
    });

    this.documentSubList = new DocumentSubList({
      element: {
        $parent: this.$target,
        $target: document.createElement("div"),
        className: "documentSubList",
      },
      initialState: [],
      props: {
        onClickSubList,
      },
    });
  }

  async setState(nextState) {
    const { id } = nextState;

    if (id !== "init") {
      const document = await documentService.getData(id);
      const documentTempStorageKey = `temp-document-${id}`;
      const tempDocument = getStorageItem(documentTempStorageKey, {
        title: "",
        content: "",
      });

      if (
        tempDocument.tempSaveDate &&
        tempDocument.tempSaveDate > document.updatedAt
      ) {
        if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
          this.editor.setState({
            ...document,
            title: tempDocument.title,
            content: tempDocument.content,
          });

          this.render();
          return;
        }
      }

      this.editor.setState(document);
      this.documentSubList.setState(document);
    } else {
      this.editor.setState({
        id: "init",
        title: "",
        content: "",
        createdAt: "",
        updatedAt: "",
      });
      this.documentSubList.setState([]);
    }

    this.render();
  }

  render() {
    this.$parent.append(this.$target);
  }
}
