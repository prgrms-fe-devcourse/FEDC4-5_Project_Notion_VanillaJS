import { push } from "../../util/router.js";
import ButtonContainer from "../EditComponents/ButtonContainer.js";
import Editor from "../EditComponents/Editor.js";
import Header from "../Header.js";
import { request } from "../../util/api.js";

export default function EditPage({ $target, initalState, onEdit, onDelete }) {
  if (!new.target) new EditPage({ $target, initalState, onEdit, onDelete });

  const $page = document.createElement("section");
  $page.classList.add("edit");
  this.state = initalState;

  this.setState = async (nextState) => {
    console.log(nextState);
    if (this.state.selectedId === nextState.selectedId && nextState.post) {
      this.state = { ...this.state, ...nextState };
      header.setState(this.state.post || { title: "Untitle" });
      editor.setState(this.state.post || { title: "Untitle", content: "" });
      buttonContainer.setState(
        { documents: this.state.post.documents } || { documents: [] }
      );
      this.render();
      return;
    }
    this.state = { ...this.state, ...nextState };
    if (this.state.selectedId === "new" || this.state.selectedId === null) {
      header.setState({ title: "Untitle" });
      editor.setState({ title: "Untitle", content: "" });
      buttonContainer.setState({ documents: [] });
      this.render();
    } else {
      await loadPost();
    }
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
    if (this.state.selectedId !== null) {
      $target.appendChild($page);
    }
  };

  const loadPost = async () => {
    const post = await request(`/documents/${this.state.selectedId}`, {
      method: "GET",
    });
    if (!post) {
      alert("현재 post가 없습니다");
      push("/");
      return;
    }
    this.setState({ ...this.state, post });
  };
}
