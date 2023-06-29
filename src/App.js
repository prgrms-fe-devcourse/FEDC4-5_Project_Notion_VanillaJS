import DocumentContent from "./DocumentContent";
import DocumentList from "./DocumentList";

export default class App {
  constructor() {
    this.appEl = document.querySelector("#app");

    this.render();
  }

  setDocumentContentState(nextState) {
    this.documentContent.setState(nextState);
  }

  render() {
    this.documentList = new DocumentList({
      parentEl: this.appEl,
      setDocumentContentState: (nextState) => {
        this.setDocumentContentState(nextState);
      },
    });
    this.documentContent = new DocumentContent({
      parentEl: this.appEl,
    });
  }
}
