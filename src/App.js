import SideBar from "./SideBar";
import Content from "./Content";

export default class App {
  constructor() {
    this.appEl = document.querySelector("#app");
    this.render();
  }

  render() {
    this.sideBar = new SideBar({
      parentEl: this.appEl,
      setDocumentContentState: (nextState) => {
        this.content.documentContent.setState(nextState);
      },
    });
    this.content = new Content({
      parentEl: this.appEl,
      getDocumentListState: () => this.sideBar.documentList.state,
      setDocumentListState: (nextState) => {
        this.sideBar.documentList.setState(nextState);
      },
    });
  }
}
