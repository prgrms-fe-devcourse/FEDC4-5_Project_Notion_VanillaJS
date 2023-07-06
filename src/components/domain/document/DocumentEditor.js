import { getDocument } from "../../../api/document.js";
import { PATH } from "../../../constants/path.js";
import { push } from "../../../utils/route.js";
import RecurChildDocument from "./template/RecurChildDocument.js";

export default function DocumentEditor({
  parentElement,
  onEditing,
  getChildDocuments,
}) {
  const containerElement = document.createElement("div");
  containerElement.className = "editor-container";

  this.state = { title: "", content: "", documentId: "" };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  containerElement.addEventListener("input", (e) => {
    if (e.target.closest(".editor-title")) {
      this.setState({
        ...this.state,
        title: e.target.value,
        isChangeTitle: true,
      });
    }

    if (e.target.closest(".editor-content")) {
      this.setState({
        ...this.state,
        content: e.target.innerHTML,
        isChangeTitle: false,
      });
    }

    onEditing(this.state);
  });

  containerElement.addEventListener("click", (e) => {
    if (e.target.closest(".child-document")) {
      push(`${PATH.DOCUMENTS}/${e.target.dataset.id}`);
    }
  });

  this.render = async () => {
    const { pathname } = window.location;
    const documentId = Number(pathname.split("/")[2]);

    if (!documentId) return;

    parentElement.append(containerElement);

    const childDocuments = getChildDocuments(documentId);
    const data = await getDocument(documentId);
    const { title, content } = data;

    this.setState({ title, content, documentId });

    containerElement.innerHTML = `
      <input type="text" class="editor-title" value="${
        title ?? ""
      }" placeholder="제목 없음" />
      <div contentEditable class="editor-content">${content ?? ""}</div>
      ${RecurChildDocument(childDocuments)}
    `;
  };
}
