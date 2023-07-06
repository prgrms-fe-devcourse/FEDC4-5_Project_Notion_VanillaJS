import DocumentEditor from "./DocumentEditor.js";

import { push } from "../../router.js";
import { createDocument, getDocument, modifyDocument } from "../../api/api.js";

export default function Document({ $target, initialState, onFetchSidebar }) {
  const $document = document.createElement("div");

  $document.classList.add("document");

  this.state = initialState;

  this.setState = async (nextState) => {
    if (nextState.id === null) {
      this.state = nextState;

      documentEditor.setState({
        title: "",
        content: "",
      });

      return;
    }

    const document = await getDocument(nextState.id);

    if (document === undefined) {
      this.setState({ id: null });
      push("/");

      return;
    }

    this.state = document;

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
        if (this.state.id === null) {
          const newState = {
            title: nextState.title,
            parent: null,
          };
          const modifiedNewState = {
            title: nextState.title,
            content: nextState.content,
          };
          const createdDocument = await createDocument(newState);

          await modifyDocument(createdDocument.id, modifiedNewState);
          onFetchSidebar();
          push(`/documents/${createdDocument.id}`);

          return;
        }

        await modifyDocument(this.state.id, nextState);
        onFetchSidebar();
      }, 1000);
    },
  });

  $target.appendChild($document);
}
