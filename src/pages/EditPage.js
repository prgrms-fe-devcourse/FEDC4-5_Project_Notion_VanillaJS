import { Editor, DocumentSubList } from "../components/index.js";
import { documentService, documentTempStorage } from "../domain/index.js";
import { INIT_ID } from "../constants/symbol.js";

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
      props: {
        initialState: {
          id: INIT_ID,
          title: "",
          content: "",
          createdAt: "",
          updatedAt: "",
        },
        onEditDocument,
      },
    });

    this.documentSubList = new DocumentSubList({
      element: {
        $parent: this.$target,
        $target: document.createElement("div"),
        className: "documentSubList",
      },
      props: {
        initialState: [],
        onClickSubList,
      },
    });
  }

  async setState(nextState) {
    const { id } = nextState;

    if (id !== INIT_ID) {
      const document = await documentService.getData(id);
      const documentTempStorageKey = `temp-document-${id}`;
      const { tempSaveDate, title, content } = documentTempStorage(
        documentTempStorageKey
      ).getData();

      if (tempSaveDate && tempSaveDate > document.updatedAt) {
        if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
          this.editor.setState({
            ...document,
            title,
            content,
          });

          this.render();
          return;
        }
      }

      this.editor.setState(document);
      this.documentSubList.setState(document);
    } else {
      this.editor.setState({
        id: INIT_ID,
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
