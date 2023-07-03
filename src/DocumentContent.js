import { request } from "./api";

export default class DocumentContent {
  constructor({ parentEl, onTextChange }) {
    this.parentEl = parentEl;
    this.currentEl = document.createElement("div");
    this.parentEl.appendChild(this.currentEl);

    this.onTextChange = onTextChange;
    this.timer = null;

    this.state = { title: "", content: "" };
    this.render(this.state);
  }

  setState(nextState) {
    this.state = nextState;
    this.render(this.state);
  }

  setEvent() {
    const titleInput = this.currentEl.querySelector("#title");
    const contentInput = this.currentEl.querySelector("#content");
    titleInput.addEventListener("keyup", this.onTextChange);
    contentInput.addEventListener("keyup", this.onTextChange);
  }

  template({ title, content }) {
    return `
    <input id="title" name="title" type="text" value="${title}">
    <input id="content" name="content" type="text" value="${content}"/>
    `;
  }

  render(nextState) {
    this.currentEl.innerHTML = this.template(nextState);
    this.setEvent();
  }
}
