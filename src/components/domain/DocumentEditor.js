import { getDocument } from "../../api/document.js";
import { PATH } from "../../constants/path.js";
import { push } from "../../utils/route.js";
import RecurChildDocument from "../template/RecurChildDocument.js";

export default function DocumentEditor({ appElement, onEditing }) {
  const containerElement = document.createElement("div");

  this.state = { title: "", content: "", documentId: "" };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  containerElement.addEventListener("input", (e) => {
    if (e.target.closest(".title")) {
      this.setState({
        ...this.state,
        title: e.target.value,
        isChangeTitle: true,
      });
    }

    if (e.target.closest(".content")) {
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
    appElement.append(containerElement);
    const { pathname } = window.location;

    const documentId = Number(pathname.split("/")[2]);
    const data = await getDocument(documentId);

    this.setState({ title: data.title, content: data.content, documentId });

    containerElement.innerHTML = `
      <h2>문서 작업 페이지<h2>
      <input type="text" class="title" value="${
        data.title ?? ""
      }" placeholder="제목 없음" />
      <div contentEditable class="content">${data.content ?? ""}</div>
      ${RecurChildDocument(data.documents)}
    `;
  };
}
