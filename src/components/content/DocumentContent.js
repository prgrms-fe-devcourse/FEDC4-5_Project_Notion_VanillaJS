import { request } from "../../api.js";
import Editor from "./Editor.js";

export default function DocumentContent({ $target, initialState }) {
  const $contentSection = document.createElement("section");
  $contentSection.setAttribute("id", "contentSection");

  this.state = initialState;

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      await fetchData();
    }
    this.render();
  };

  let timer = null;

  const editor = new Editor({
    $target: $contentSection,
    initialState: {
      title: this.state.title,
      content: this.state.content,
    },
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await request(`/documents/${this.state.documentId}`, {
          method: "PUT",
          body: JSON.stringify(document),
        });
      }, 2000);
    },
  });

  const fetchData = async () => {
    const currentId = this.state.documentId;
    const document = await request(`/documents/${currentId}`);
    console.log(document);
    editor.setState({
      title: document.title,
      content: document.content,
    });
  };

  this.render = () => {
    $target.appendChild($contentSection);
  };
}
