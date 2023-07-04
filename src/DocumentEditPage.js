import Editor from "./Editor.js";
import { request } from "./api.js";
import { push } from "./router.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $documentEditPage = document.createElement("div");

  $documentEditPage.className = "documentEditPage";

  this.state = initialState;

  const editor = new Editor({
    $target: $documentEditPage,
    initialState: {
      title: "Untitled",
      content: "",
    },
    onEditing: (doc) => {},
  });

  this.setState = async (nextState) => {
    if (this.state.docId === "new") {
      editor.setState(this.state.doc);

      this.render();
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
