import Button from "./Button";
import DocumentContent from "./DocumentContent";
import DocumentList from "./DocumentList";
import { request } from "./api.js";

export default class App {
  constructor() {
    this.appEl = document.querySelector("#app");

    this.render();
  }

  render() {
    this.button = new Button({
      parentEl: this.appEl,
      onButtonClick: async () => {
        const { id } = await request.addDocumentItem(0);
        history.pushState(null, null, `/${id}`);
        this.documentContent.setState(await request.getDocumentItem(id));
        this.documentList.setState(await request.getDocumentList());
      },
      text: "페이지 추가하기",
    });
    this.documentList = new DocumentList({
      parentEl: this.appEl,
      onMovePageSpanClick: async (e) => {
        const {
          currentTarget: { id },
        } = e;
        history.pushState(null, null, `/${id}`);
        this.documentContent.setState(await request.getDocumentItem(id));
      },
      onAddSubPageButtonClick: async (e) => {
        const {
          currentTarget: { parentNode },
        } = e;
        const { id } = await request.addDocumentItem(parentNode.id.slice(3));

        console.log(parentNode.id, id);
        history.pushState(null, null, `/${id}`);
        this.documentContent.setState(await request.getDocumentItem(id));
        this.documentList.setState(await request.getDocumentList());
      },
      onRemoveSubPageButtonClick: async (e) => {
        const id = e.currentTarget.id;
        await request.deleteDocumentItem(id);
        this.documentList.setState(await request.getDocumentList());
      },
    });
    this.documentContent = new DocumentContent({
      parentEl: this.appEl,
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
          this.documentList.setState(await request.getDocumentList());
        }, 1500);
      },
    });
  }
}
