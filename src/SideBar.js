import Button from "./Button";
import { request } from "./api.js";
import { getRightNextState } from "./util";
import DocumentList from "./DocumentList";
import MockUp from "./MockUp";

export default class SideBar {
  constructor({ parentEl, setDocumentEditorState }) {
    this.parentEl = parentEl;
    this.currentEl = document.createElement("div");
    this.currentEl.classList.add("sidebar");
    this.setDocumentEditorState = setDocumentEditorState;
    this.parentEl.appendChild(this.currentEl);

    this.render();
  }

  render() {
    this.mockUp = new MockUp({
      parentEl: this.currentEl,
    });
    this.button = new Button({
      parentEl: this.currentEl,
      onButtonClick: async () => {
        const { id } = await request.addDocumentItem(0);
        history.pushState(null, null, `/${id}`);
        this.setDocumentEditorState(await request.getDocumentItem(id));

        const nextState = getRightNextState(
          this.documentList.state,
          await request.getDocumentList()
        );

        this.documentList.setState(nextState);
      },
      text: "페이지 추가",
    });
    this.documentList = new DocumentList({
      parentEl: this.currentEl,
      onMovePageSpanClick: async (e) => {
        const {
          currentTarget: { id },
        } = e;
        history.pushState(null, null, `/${id}`);
        this.setDocumentEditorState(await request.getDocumentItem(id));
      },
      onAddSubPageButtonClick: async (e) => {
        const {
          currentTarget: {
            parentNode: {
              parentNode: { parentNode },
            },
          },
        } = e;
        const { id } = await request.addDocumentItem(parentNode.id.slice(3));

        history.pushState(null, null, `/${id}`);
        this.setDocumentEditorState(await request.getDocumentItem(id));

        const nextState = getRightNextState(
          this.documentList.state,
          await request.getDocumentList()
        );

        this.documentList.setState(nextState);
      },
      onRemoveSubPageButtonClick: async (e) => {
        const id = e.currentTarget.id;
        await request.deleteDocumentItem(id);

        const nextState = getRightNextState(
          this.documentList.state,
          await request.getDocumentList()
        );

        this.documentList.setState(nextState);
      },
      onToggleSubPageButtonClick: (e) => {
        const id = e.currentTarget.id;
        const stack = [...this.documentList.state];

        while (stack.length) {
          const current = stack.pop();
          if (current.id == id) {
            current.isSpread = !current.isSpread;
          }
          const documents = [...current.documents];
          for (let i = 0; i < documents.length; i++) {
            stack.push(current.documents[i]);
          }
        }
        this.documentList.setState(this.documentList.state);
      },
    });
  }
}
