import ButtonContainer from "../EditComponents/ButtonContainer.js";
import Editor from "../EditComponents/Editor.js";
import Header from "../Header.js";

export default function EditPage({ $target, initalState, onEdit, onDelete }) {
  if (!new.target) new EditPage({ $target, initalState, onEdit, onDelete });

  const $page = document.createElement("section");
  $page.classList.add("edit");
  this.state = initalState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    header.setState(this.state.post.title || { title: "Untitle" });
    editor.setState(this.state.post || { title: "Untitle", content: "" });
    buttonContainer.setState(
      { documents: this.state.post.documents } || { documents: [] }
    );
    this.render();
  };

  const header = new Header({
    $target: $page,
    initalState: { title: "Untitle" },
  });

  const editor = new Editor({
    $target: $page,
    initalState: { title: "Untitle", content: "" },
    onEdit,
  });

  const buttonContainer = new ButtonContainer({
    $target: $page,
    initalState: { documents: [] },
  });

  this.render = () => {
    $target.appendChild($page);
  };
}
