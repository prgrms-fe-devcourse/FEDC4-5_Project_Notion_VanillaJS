import Button from "./Button";
import DocumentContent from "./DocumentContent";
import DocumentList from "./DocumentList";
import { request } from "./api.js";

export default class App {
  constructor() {
    this.appEl = document.querySelector("#app");

    this.render();
  }

  setDocumentContentState(nextState) {
    this.documentContent.setState(nextState);
  }
  setDocumentListState(nextState) {
    this.documentList.setState(nextState);
  }

  render() {
    this.button = new Button({
      parentEl: this.appEl,
      onButtonClick: async () => {
        const newDocument = await request.addDocumentItem(0);
        history.pushState(null, null, `/${newDocument.id}`);
        const nextState = await request.getDocumentItem(newDocument.id);
        this.setDocumentContentState(nextState);
        this.setDocumentListState(await request.getDocumentList());
      },
      text: "페이지 추가하기",
    });
    this.documentList = new DocumentList({
      parentEl: this.appEl,
      setDocumentContentState: (nextState) => {
        this.setDocumentContentState(nextState);
      },
    });
    this.documentContent = new DocumentContent({
      parentEl: this.appEl,
      setDocumentListState: (nextState) => {
        this.setDocumentListState(nextState);
      },
    });
  }
}
