import {
  getDocument,
  getDocuments,
  postDocument,
  putDocument,
} from "../../api/document.js";

export default function Edit({ appElement }) {
  const containerElement = document.createElement("div");

  this.state = { title: "", content: "", documentId: "" };

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
    if (e.target.closest(".post-button")) {
      postDocument(this.state);
    }

    if (e.target.closest(".put-button")) {
      putDocument({ documentId: "74387", data: this.state });
    }

    if (e.target.closest(".temp-button")) {
      const tempData = await getDocuments();
      console.log(tempData);
    }
  });

  this.render = async () => {
    appElement.append(containerElement);

    let data;

    const params = new URLSearchParams(window.location.search);
    const documentId = params.get("document-id");

    if (documentId) {
      data = await getDocument(documentId);
      this.setState({ title: data.title, content: data.content, documentId });
    }

    containerElement.innerHTML = `
      <h2>문서 작업 페이지<h2>
      <input type="text" class="title" value="${data?.title ?? ""}" />
      <div contentEditable class="edit">${data?.content ?? ""}</div>
      <button class="post-button">문서 생성 버튼</button>
      <button class="put-button">문서 수정 버튼</button>
      <button class="temp-button">데이터 확인</button>
    `;
  };
}
