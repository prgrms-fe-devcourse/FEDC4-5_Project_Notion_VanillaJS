import { createDomElementWithId } from "../utils/dom.js";
import { request } from "../utils/api.js";

export default function EditPage({ target, initialState }) {
  const divElement = document.createElement("div");
  divElement.id = "editPage";
  target.appendChild(divElement);

  const titleElement = createDomElementWithId("input", "title");
  titleElement.type = "text";
  divElement.appendChild(titleElement);

  const contentElement = createDomElementWithId("textArea", "content");
  divElement.appendChild(contentElement);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState; // state에서 selectedDocumentId 변경해주고
    this.render(); // 이에 따라 title과 content 내용은 render에서 업데이트 ?
  };

  this.render = async () => {
    if (this.state.selectedDocumentId) {
      // selectedDocumentId에 대한 title, content 값으로 UI 업데이트
      const { title, content, documents } = await request(
        `/${this.state.selectedDocumentId}`
      );

      titleElement.value = title;
      contentElement.value = content;
      console.log(`documents: ${documents}`);
    } else {
      // null일 때는 mainPage 렌더링
      console.log(`not selected`);
    }
  };
  this.render();
}
