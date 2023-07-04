import { getRightNextState } from "./util";
import { request } from "./api";
import DocumentContent from "./DocumentContent";

export default class Content {
  constructor({ parentEl, getDocumentListState, setDocumentListState }) {
    this.parentEl = parentEl;
    this.currentEl = document.createElement("div");
    this.getDocumentListState = getDocumentListState;
    this.setDocumentListState = setDocumentListState;
    this.parentEl.appendChild(this.currentEl);

    this.render();
  }

  render() {
    this.documentContent = new DocumentContent({
      parentEl: this.currentEl,
      onTextChange: (e) => {
        const { pathname } = location;
        let id = pathname.slice(1);

        const { name, value } = e.currentTarget;

        this.documentContent.state = {
          ...this.documentContent.state,
          [name]: value,
        };
        if (this.documentContent.timer !== null) {
          clearTimeout(this.documentContent.timer);
        }
        this.documentContent.timer = setTimeout(async () => {
          await request.updateDocumentItem(id, this.documentContent.state);
          console.log(this.documentListState);
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
