import { request } from "./api";

export default class DocumentContent {
  constructor({ parentEl }) {
    this.parentEl = parentEl;
    this.documentContentEl = document.createElement("div");
    this.parentEl.appendChild(this.documentContentEl);

    this.state = { title: "", content: "" };

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  template() {
    const { title, content } = this.state;
    return `
    <input type="text" value="${title}">
    <input type="text" value="${content}"/>
    `;
  }

  async render() {
    const { pathname } = location;
    let id = pathname.slice(1);
    this.state = await request.getDocumentItem(id);
    this.documentContentEl.innerHTML = this.template();
  }
}
