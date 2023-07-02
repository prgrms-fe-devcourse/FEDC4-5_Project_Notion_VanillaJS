import { getDocument, getDocuments, putDocument } from "../../api/document.js";

export default function Edit({ appElement }) {
  const containerElement = document.createElement("div");

  this.state = { title: "", content: "", documentId: "", parent: null };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  containerElement.addEventListener("input", (e) => {
    if (e.target.closest(".title")) {
      this.setState({ ...this.state, title: e.target.value });
    }
  });

  containerElement.addEventListener("input", (e) => {
    if (e.target.closest(".edit")) {
      this.setState({ ...this.state, content: e.target.innerHTML });
    }
  });

  containerElement.addEventListener("click", async (e) => {
    /**
     * @todo 게시물이 추가 될 때 리스트 최신화
     */
    if (e.target.closest(".put-button")) {
      putDocument({ documentId: this.state.documentId, data: this.state });
    }

    if (e.target.closest(".temp-button")) {
      const tempData = await getDocuments();
      console.log(tempData);
    }
  });

  this.render = async () => {
    appElement.append(containerElement);
    const { pathname } = window.location;

    const documentId = pathname.split("/")[2];
    const data = await getDocument(documentId);
    this.setState({ title: data.title, content: data.content, documentId });

    containerElement.innerHTML = `
      <h2>문서 작업 페이지<h2>
      <input type="text" class="title" value="${
        data.title ?? ""
      }" placeholder="제목 없음" />
      <div contentEditable class="edit">${data.content ?? ""}</div>
      <button class="put-button">문서 수정 버튼</button>
      <button class="temp-button">데이터 확인</button>
    `;
  };
}
