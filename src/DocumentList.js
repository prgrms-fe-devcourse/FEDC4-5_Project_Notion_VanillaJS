import { request } from "./api";

export default class DocumentList {
  constructor({ parentEl, onMovePageSpanClick, onAddSubPageButtonClick }) {
    this.parentEl = parentEl;
    this.currentEl = document.createElement("div");
    this.parentEl.appendChild(this.currentEl);

    this.onMovePageSpanClick = onMovePageSpanClick;
    this.onAddSubPageButtonClick = onAddSubPageButtonClick;

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
      span.addEventListener("click", this.onMovePageSpanClick);
    });

    const addButtons = document.querySelectorAll(".add-button");
    addButtons.forEach((button) => {
      button.addEventListener("click", this.onAddSubPageButtonClick);
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
    this.currentEl.innerHTML = this.template(nextState, 0);
    this.setEvent();
  }
}
