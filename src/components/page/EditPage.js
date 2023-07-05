import Editor from "../EditComponents/Editor.js";
import Header from "../Header.js";

export default function EditPage({ $target, initalState, onEdit, onDelete }) {
  if (!new.target) new EditPage({ $target, initalState, onEdit, onDelete });

  const $page = document.createElement("section");
  $page.classList.add("edit");
  this.state = initalState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    editor.setState(this.state.posts || { title: "Untitle", content: "" });
    this.render();
  };

  const editor = new Editor({
    $target: $page,
    initalState: this.state.post,
    onEdit,
  });

  this.render = () => {
    $target.appendChild($page);
  };
}
