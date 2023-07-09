import { push } from "../../util/router.js";
import ButtonContainer from "../EditComponents/ButtonContainer.js";
import Editor from "../EditComponents/Editor.js";
import Header from "../Header.js";
import { request } from "../../util/api.js";
import { UNTITLE } from "../../constant.js";
import { isSuitableId } from "../../util/prevent.js";

export default function EditPage({ $target, initalState, onEdit, onDelete }) {
  if (!new.target) new EditPage({ $target, initalState, onEdit, onDelete });

  const $page = document.createElement("section");
  $page.classList.add("editContainer");
  this.state = initalState;

  this.setState = async (nextState) => {
    if (this.state.selectedId === nextState.selectedId && nextState.post) {
      this.state = { ...this.state, ...nextState };
      header.setState({ title: this.state.post.title || UNTITLE });
      editor.setState(this.state.post || { title: UNTITLE, content: "" });
      buttonContainer.setState({ documents: this.state.post.documents || [] });
      this.render();
      return;
    }
    this.state = { ...this.state, ...nextState };
    if (isSuitableId(this.state.selectedId)) {
      header.setState({ title: UNTITLE });
      editor.setState({ title: UNTITLE, content: "" });
      buttonContainer.setState({ documents: [] });
      this.render();
    } else {
      await loadPost();
    }
  };

  const header = new Header({
    $target: $page,
    initalState: { title: UNTITLE },
  });

  const editor = new Editor({
    $target: $page,
    initalState: {
      title: UNTITLE,
      content: "",
    },
    onEdit,
  });

  const buttonContainer = new ButtonContainer({
    $target: $page,
    initalState: { documents: this.state.post.documents || [] },
  });

  this.render = () => {
    if (!isSuitableId(this.state.selectedId)) {
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
