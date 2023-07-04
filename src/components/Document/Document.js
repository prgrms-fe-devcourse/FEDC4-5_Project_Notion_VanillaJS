import { getDocument, modifyDocument } from "../../api/api.js";
import DocumentEditor from "./DocumentEditor.js";

export default function Document({ $target, initialState, onFetchSidebar }) {
  const $document = document.createElement("div");

  this.state = initialState;

  this.setState = async (nextState) => {
    if (nextState.id === null) {
      documentEditor.setState({
        title: "제목 없음",
        content: "내용 없음",
      });

      return;
    }

    this.state = await getDocument(nextState.id);

    documentEditor.setState({
      title: this.state.title,
      content: this.state.content,
    });
  };

  let timer = "";

  const documentEditor = new DocumentEditor({
    $target: $document,
    initialState: {},
    onEditing: (nextState) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await modifyDocument(this.state.id, nextState);
        onFetchSidebar();
      }, 2000);
    },
  });

  $target.appendChild($document);
}
