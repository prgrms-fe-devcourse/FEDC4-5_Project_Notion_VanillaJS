import { request } from "./api";

export default class DocumentList {
  constructor({ targetEl, initialState }) {
    this.targetEl = targetEl;
    this.state = initialState;

    this.documentListEl = document.createElement("div");
    this.targetEl.appendChild(this.documentListEl);
    this.render();
    this.setEvent();
  }
  setEvent() {
    const spreadButtons = document.querySelectorAll(".spread-document");

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
  }
  render() {
    const state = this.state.map((item) => [item, null]);
    const queue = state;
    while (queue.length) {
      const [currentDocument, parentId] = queue.shift();

      const currentDocumentEl = `
      <li id=${currentDocument.id}>
        <button class="spread-document" id=${currentDocument.id}>펼치기</button>
        ${currentDocument.title}
      </li>`;

      if (parentId === null) {
        this.documentListEl.innerHTML += currentDocumentEl;
      } else {
        const parentDocumentEl = document.getElementById(parentId);
        if (!parentDocumentEl.querySelector("ul")) {
          const documentWrapperEl = `
                <ul id="ul-${parentId}" style="display:none;"></ul>
            `;
          parentDocumentEl.innerHTML += documentWrapperEl;
        }
        const documentWrapperEl = parentDocumentEl.querySelector("ul");
        documentWrapperEl.innerHTML += currentDocumentEl;
      }

      for (let i = 0; i < currentDocument.documents.length; i++) {
        queue.push([currentDocument.documents[i], currentDocument.id]);
      }
    }
  }
}
