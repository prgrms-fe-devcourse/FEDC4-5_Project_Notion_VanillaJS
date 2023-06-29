import { request } from "./api";

export default class DocumentList {
  constructor({ parentEl, setDocumentContentState }) {
    this.parentEl = parentEl;
    this.documentListEl = document.createElement("div");
    this.parentEl.appendChild(this.documentListEl);
    this.setDocumentContentState = setDocumentContentState;
    this.state = [];

    this.render();
  }

  async loadData() {
    this.state = await request.getDocumentList();
    this.setState(this.state);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  setEvent() {
    const spreadButtons = document.querySelectorAll(".spread-button");
    spreadButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const documentWrapperEl = document.querySelector(
          `ul#ul-${e.target.id}`
        );
        if (documentWrapperEl) {
          if (documentWrapperEl.style.display === "none") {
            documentWrapperEl.style.display = "block";
            e.currentTarget.textContent = "닫기";
          } else {
            documentWrapperEl.style.display = "none";
            e.currentTarget.textContent = "펼치기";
          }
        }
      });
    });

    const linkSpans = document.querySelectorAll(".link-item");
    linkSpans.forEach((span) => {
      span.addEventListener("click", async () => {
        history.pushState(null, null, `/${span.id}`);

        const nextState = await request.getDocumentOne(span.id);
        this.setDocumentContentState(nextState);
      });
    });
  }

  template(documents, parentId) {
    return `
    <ul id="ul-${parentId}" style="display:${
      parentId === 0 ? "block" : "none"
    };">
        ${documents.map(
          ({ id, title, documents }) =>
            `
                <li id=${id}>
                    <button class="spread-button" id=${id}>펼치기</button>
                    <span class="link-item" id=${id}>${title}</span>
                    ${this.template(documents, id)}
                </li>
            `
        )}
    </ul>`;
  }

  async render() {
    this.state = await request.getDocumentList();
    this.documentListEl.innerHTML = this.template(this.state, 0);
    this.setEvent();
  }
}
