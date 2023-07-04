import {
  createDocumentElement,
  createDomElementWithId,
  toggleDisplay,
  toggleSpreadIcon,
  toggleToSpreadDoucmentList,
} from "../utils/dom.js";
import { getSpreadDocumentFromStorage } from "../utils/storage.js";

export default function DocumentList({
  target,
  initialState,
  onChangeSelectedDocumentId,
  onAddChildDocument,
  onDeleteDocument,
}) {
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

  // 이벤트 버블을 이용해 + 버튼, - 버튼 클릭시 동작 구현
  documentListElement.addEventListener("click", (e) => {
    const documentItem = e.target.closest(".documentItem");
    if (documentItem) {
      const { id } = documentItem;
      const { className } = e.target;

      if (className === "spreadButton") {
        // 버튼 icon 및 display 토글하기
        toggleSpreadIcon(e.target);
        toggleDisplay(documentItem.querySelector(".childDocumentList"));
        toggleToSpreadDoucmentList(id.toString());
      } else if (className === "addChildDocumentButton") {
        // 현재 document의 하위 document 생성
        onAddChildDocument(id);
        // this.render(); => 여기서 render 할 필요 x => App에서 documentList 다시 불러온 다음, 계속 하위 setState부르면서, 여기 render까지 호출할 것
      } else if (className === "deleteDocumentButton") {
        onDeleteDocument(id);
      } else {
        // 버튼이 아닌 title이나 다른 부분을 클릭했을 때, selectedDocumentId를 변경
        onChangeSelectedDocumentId(id);
      }
    }
  });

  this.render = () => {
    console.log("render 실행 ")
    // render 될 때마다, documentlist 다 새로 그려줌 
    // 배열로 된 state에 따라, documentList에 들어가는 documentItem들을 쭉 만들어주기

    // root의 자식 element들 먼저 다 지워주고,
    while (documentListElement.firstChild) {
      documentListElement.removeChild(documentListElement.firstChild);
    }

    const spreadDocumentList = getSpreadDocumentFromStorage();
    console.log(`현재 spreadDocumentList: ${spreadDocumentList}`)
    // spread 되어있는 documentId들을 전달해서 여기 있는 애들은 childDocumentList display flex, 없으면 none

    this.state.forEach((document) => {
      documentListElement.appendChild(
        createDocumentElement(document, spreadDocumentList)
      );
    });
  };

  this.render();
}
