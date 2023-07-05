import { request } from "../../api.js";
import Editor from "./Editor.js";

export default function DocumentContent({ $target, initialState }) {
  const $contentSection = document.createElement("section");
  $contentSection.setAttribute("id", "contentSection");

  this.state = initialState;

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;
      fetchData();
    }
    this.render();
  };

  const editor = new Editor({
    $target: $contentSection,
    initialState: {
      title: this.state.title,
      content: this.state.content,
    },
  });

  const fetchData = async () => {
    const currentId = this.state.documentId;
    if (currentId !== "new") {
      const document = await request(`/documents/${currentId}`);
      console.log(document);
      editor.setState({
        title: document.title,
        content: document.content,
      });
    }
  };

  this.render = () => {
    $target.appendChild($contentSection);
  };
}
