import Editor from "./Editor.js";
import { request } from "./api.js";
import { push } from "./router.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $documentEditPage = document.createElement("div");

  $documentEditPage.className = "documentEditPage";

  this.state = initialState;

  let docLocalSaveKey = `temp-document-${this.state.docId}`;
  let timer = null;

  const editor = new Editor({
    $target: $documentEditPage,
    initialState: {
      title: "Untitled",
      content: "",
    },
    onEditing: (doc) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const isNewDocument = this.state.docId === "new";
        if (isNewDocument) {
          const createdDoc = await request("/documents", {
            method: "POST",
            body: JSON.stringify(doc),
          });
          await request(`/documents/${createdDoc.id}`, {
            method: "PUT",
            body: JSON.stringify(doc),
          });

          history.replaceState(null, null, `/documents/${createdDoc.id}`);

          this.setState({
            docId: createdDoc.id,
          });

          push(createdDoc.id);
        } else {
          await request(`/documents/${doc.id}`, {
            method: "PUT",
            body: JSON.stringify(doc),
          });
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.docId === "new") {
      this.state = nextState;
      editor.setState(this.state.doc);

      this.render();
      return;
    } else {
      await fetchDocument();
    }
    this.state = nextState;
    this.render();
  };

  const fetchDocument = async () => {
    const { docId } = this.state;

    if (this.state !== "new") {
      const doc = await request(`/documents/${docId}`, {
        method: "GET",
      });

      this.setState({
        ...this.state,
        doc,
      });
    }
  };

  this.render = () => {
    $target.appendChild($documentEditPage);
  };
}
