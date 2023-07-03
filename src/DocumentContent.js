import { request } from "./api";

export default class DocumentContent {
  constructor({ parentEl, setDocumentListState }) {
    this.parentEl = parentEl;
    this.documentContentEl = document.createElement("div");
    this.parentEl.appendChild(this.documentContentEl);

    this.setDocumentListState = setDocumentListState;

    this.state = { title: "", content: "" };
    this.render(this.state);
  }

  setState(nextState) {
    this.state = nextState;
    this.render(this.state);
  }

  setEvent() {
    const { pathname } = location;
    let id = pathname.slice(1);

    let timer = null;

    const documentTitle =
      this.documentContentEl.querySelector("#document-title");

    documentTitle.addEventListener("keyup", (e) => {
      this.state = { ...this.state, title: e.currentTarget.value };
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await request.updateDocumentItem(id, this.state);
        const documentListData = await request.getDocumentList();
        this.setDocumentListState(documentListData);
      }, 1500);
    });

    const documentContent =
      this.documentContentEl.querySelector("#document-content");

    documentContent.addEventListener("keyup", async (e) => {
      this.state = { ...this.state, content: e.currentTarget.value };
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await request.updateDocumentItem(id, this.state);
        const documentListData = await request.getDocumentList();
        this.setDocumentListState(documentListData);
      }, 1500);
    });
  }

  template({ title, content }) {
    return `
    <input id="document-title" type="text" value="${title}">
    <input id="document-content" type="text" value="${content}"/>
    `;
  }

  render(nextState) {
    this.documentContentEl.innerHTML = this.template(nextState);
    this.setEvent();
  }
}
