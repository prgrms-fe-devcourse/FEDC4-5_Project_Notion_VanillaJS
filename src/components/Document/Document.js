import { getDocument } from "../../api/api.js";
import DocumentEditor from "./DocumentEditor.js";

export default function Document({ $target, initialState }) {
  const $document = document.createElement("div");

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = await getDocument(nextState.id);

    documentEditor.setState({
      title: this.state.title,
      content: this.state.content,
    });
  };

  const documentEditor = new DocumentEditor({
    $target: $document,
    initialState: {},
  });

  $target.appendChild($document);
}
