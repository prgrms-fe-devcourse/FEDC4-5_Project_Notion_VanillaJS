import { request } from "./api";

export default class DocumentList {
  constructor({
    parentEl,
    onMovePageSpanClick,
    onAddSubPageButtonClick,
    onRemoveSubPageButtonClick,
    onToggleSubPageButtonClick,
  }) {
    this.parentEl = parentEl;
    this.currentEl = document.createElement("div");
    this.currentEl.classList.add("document-list-wrapper");
    this.parentEl.appendChild(this.currentEl);

    this.onMovePageSpanClick = onMovePageSpanClick;
    this.onAddSubPageButtonClick = onAddSubPageButtonClick;
    this.onRemoveSubPageButtonClick = onRemoveSubPageButtonClick;
    this.onToggleSubPageButtonClick = onToggleSubPageButtonClick;

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

    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", this.onRemoveSubPageButtonClick);
    });
    const toggleButtons = document.querySelectorAll(
      ".document-list__toggle-button"
    );
    toggleButtons.forEach((button) => {
      button.addEventListener("click", this.onToggleSubPageButtonClick);
    });
  }

  template(state, parentId) {
    return `
    <ul id="ul-${parentId}" class="document-list-container">
        ${state
          .map(
            ({ id, title, documents, isSpread }) =>
              `
                <li id=li-${id} class="document-list">
                  <div class="document-list__box">
                    <div class="document-list__text">
                      <button id=${id} class="document-list__toggle-button">
                        <i class="fa-solid fa-chevron-down"></i>
                      </button>
                      <span class="link-item" id=${id}>${title}</span>
                    </div>
                    <div class="document-list__buttons">
                      <button id=${id} class="remove-button">
                        <i class="fa-solid fa-minus"></i>
                      </button>
                      <button class="add-button">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div>
                    ${isSpread ? this.template(documents, id) : ""}
                  </div>
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
