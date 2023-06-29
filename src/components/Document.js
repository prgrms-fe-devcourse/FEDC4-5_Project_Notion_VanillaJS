import Component from "../core/Component";
import DocumentItem from "./DocumentItem";
import { request } from "../main";

export default class Document extends Component {
  constructor() {
    super();
    request("").then((value) => {
      this.setState({ ...value });
    });
  }
  render() {
    this.el.innerHTML = `
        <div class="container">
            <button class="add-document">"+ 페이지 추가"</button>
        </div>
        `;
    this.el.setAttribute("id", "document-app");
    this.el.setAttribute("style", "background-color: rgb(251,251,250)");

    const addDocumentBtn = this.el.querySelector(".add-document");
    const docuContainer = this.el.querySelector(".container");
    for (const key in this.state) {
      const { id, title } = this.state[key];
      const existingDocu = new DocumentItem();
      existingDocu.setState({ id, title });
      docuContainer.appendChild(existingDocu.el);
    }
    addDocumentBtn.addEventListener("click", () => {
      const res = request("", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: null,
        }),
      });
      const documentItem = new DocumentItem();
      res.then((value) => {
        documentItem.setState({ id: value.id, title: value.title });
      });
      docuContainer.appendChild(documentItem.el);
    });
  }
}
