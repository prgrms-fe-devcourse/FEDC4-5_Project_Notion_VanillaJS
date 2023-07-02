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

    const renderDocuments = (container, docu) => {
      for (const key in docu) {
        const { id, title, documents } = docu[key];
        const parentDocu = new DocumentItem();
        parentDocu.setState({ id, title });
        container.appendChild(parentDocu.el);
        if (documents.length !== 0) {
          renderDocuments(parentDocu.el, documents);
        }
      }
    };

    renderDocuments(docuContainer, this.state);
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
      docuContainer.append(documentItem.el);
    });
  }
}
