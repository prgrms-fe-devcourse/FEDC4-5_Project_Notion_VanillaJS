import { getRightNextState } from "./util";
import { request } from "./api";
import DocumentEditor from "./DocumentEditor";

export default class Content {
  constructor({ parentEl, getDocumentListState, setDocumentListState }) {
    this.parentEl = parentEl;
    this.currentEl = document.createElement("div");
    this.currentEl.classList.add("content");
    this.getDocumentListState = getDocumentListState;
    this.setDocumentListState = setDocumentListState;
    this.parentEl.appendChild(this.currentEl);

    this.render();
  }

  render() {
    this.documentEditor = new DocumentEditor({
      parentEl: this.currentEl,
      onTextChange: (e) => {
        const { pathname } = location;
        let id = pathname.slice(1);

        const { name, value } = e.currentTarget;

        this.documentEditor.state = {
          ...this.documentEditor.state,
          [name]: value,
        };
        if (this.documentEditor.timer !== null) {
          clearTimeout(this.documentEditor.timer);
        }
        this.documentEditor.timer = setTimeout(async () => {
          await request.updateDocumentItem(id, this.documentEditor.state);
          const nextState = getRightNextState(
            this.getDocumentListState(),
            await request.getDocumentList()
          );

          this.setDocumentListState(nextState);
        }, 1500);
      },
    });
  }
}
