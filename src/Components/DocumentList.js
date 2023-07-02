import { createDocumentElement, createDomElementWithId } from "../utils/dom.js";

export default function DocumentList({ target, initialState }) {
  const documentListElement = createDomElementWithId(
    "div",
    "sideBar_documentList"
  );
  target.appendChild(documentListElement);

  this.state = initialState;
    
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // 배열로 된 state에 따라, documentList에 들어가는 documentItem들을 쭉 만들어주기
    this.state.forEach((document) => {
      documentListElement.appendChild(createDocumentElement(document));
    });
  };

  this.render();
}
