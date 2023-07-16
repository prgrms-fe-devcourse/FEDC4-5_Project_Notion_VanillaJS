import Component from "../core/Component.js";
import { INIT_ID, ROOT_PATH } from "../constants/index.js";

export default class Editor extends Component {
  isInitialize = false;

  constructor({ element, initialState, props }) {
    super({ element, initialState, props });
  }

  setState(nextState) {
    this.state = nextState;

    if (
      this.$target.querySelector("[name=title]") &&
      this.$target.querySelector("[name=content]")
    ) {
      this.$target.querySelector("[name=title]").value = this.state.title ?? "";
      this.$target.querySelector("[name=content]").value =
        this.state.content ?? "";
    }

    this.render();
  }

  render() {
    const { title, content, id } = this.state;

    if (!this.isInitialize) {
      this.$target.innerHTML = `
        <input type="text" name="title" placeholder="제목을 입력해주세요." value="${
          title ?? ""
        }" />
        <textarea name="content" placeholder="내용을 입력해주세요.">${
          content ?? ""
        }</textarea>
      `;

      this.isInitialize = true;
    }

    if (location.pathname === ROOT_PATH && id === INIT_ID) {
      this.$target.style.visibility = "hidden";
    } else {
      this.$target.style.visibility = "visible";
    }
  }

  addEvent() {
    this.$target.addEventListener("keyup", (e) => {
      const name = e.target.getAttribute("name");

      if (
        this.state[name] !== undefined &&
        this.state.id !== INIT_ID &&
        location.pathname !== ROOT_PATH
      ) {
        const nextState = {
          ...this.state,
          [name]: e.target.value,
        };
        this.setState(nextState);
        this.props.onEditDocument(nextState.id, {
          title: nextState.title,
          content: nextState.content,
        });
      }
    });
  }
}
