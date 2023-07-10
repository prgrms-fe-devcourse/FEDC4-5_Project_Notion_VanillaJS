import { debounceTimer, getRightNextState } from "./util";
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

        const autoSaveTime = 1500;
        const autoComplete = async () => {
          await request.updateDocumentItem(id, this.documentEditor.state);
          const nextState = getRightNextState(
            this.getDocumentListState(),
            await request.getDocumentList()
          );

          this.setDocumentListState(nextState);
        };

        debounceTimer(this.documentEditor.timer, autoComplete, autoSaveTime);
      },
    });
  }
}
