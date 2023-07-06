import SideBar from "./SideBar";
import Content from "./Content";

export default class App {
  constructor() {
    this.parentEl = document.querySelector("#app");
    this.currentEl = document.createElement("div");
    this.currentEl.classList.add("container");
    this.parentEl.appendChild(this.currentEl);
    this.render();
  }

  render() {
    this.sideBar = new SideBar({
      parentEl: this.currentEl,
      setDocumentEditorState: (nextState) => {
        this.content.documentEditor.setState(nextState);
      },
    });
    this.content = new Content({
      parentEl: this.currentEl,
      getDocumentListState: () => this.sideBar.documentList.state,
      setDocumentListState: (nextState) => {
        this.sideBar.documentList.setState(nextState);
      },
    });
  }
}
