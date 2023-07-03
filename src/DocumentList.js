import { request } from "./api";

export default class DocumentList {
  constructor({ parentEl, setDocumentContentState }) {
    this.parentEl = parentEl;
    this.documentListEl = document.createElement("div");
    this.parentEl.appendChild(this.documentListEl);
    this.setDocumentContentState = setDocumentContentState;

    (async () => {
      this.state = await request.getDocumentList();
      this.render(this.state);
    })();
  }

  setState(nextState) {
    this.state = nextState;
    this.render(this.state);
  }

  setEvent() {
    const linkSpans = document.querySelectorAll(".link-item");
    linkSpans.forEach((span) => {
      span.addEventListener("click", async () => {
        history.pushState(null, null, `/${span.id}`);

        const nextState = await request.getDocumentItem(span.id);
        this.setDocumentContentState(nextState);
      });
    });

    const addButtons = document.querySelectorAll(".add-button");
    addButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const parentId = e.currentTarget.parentNode.id;
        const newDocument = await request.addDocumentItem(parentId);
        history.pushState(null, null, `/${newDocument.id}`);
        const nextState = await request.getDocumentItem(newDocument.id);
        this.setDocumentContentState(nextState);
        this.setState(await request.getDocumentList());
      });
    });
  }

  template(state, parentId) {
    return `
    <ul id="ul-${parentId}">
        ${state
          .map(
            ({ id, title, documents }) =>
              `
                <li id=${id}>
                    <span class="link-item" id=${id}>${title}</span>
                    <button class="add-button">+</button>
                    ${this.template(documents, id)}
                </li>
            `
          )
          .join("")}
    </ul>`;
  }

  render(nextState) {
    this.documentListEl.innerHTML = this.template(nextState, 0);
    this.setEvent();
  }
}
