import Component from "../core/Component.js";

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
    if (!this.isInitialize) {
      this.$target.innerHTML = `
        <input type="text" name="title" placeholder="제목을 입력해주세요." value="${
          this.state.title ?? ""
        }" />
        <textarea name="content" placeholder="내용을 입력해주세요.">${
          this.state.content ?? ""
        }</textarea>
      `;

      this.isInitialize = true;
    }

    if (location.pathname === "/" && this.state.id === "init") {
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
        this.state.id !== "init" &&
        location.pathname !== "/"
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
