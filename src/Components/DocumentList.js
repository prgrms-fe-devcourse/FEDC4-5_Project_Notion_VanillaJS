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

  documentListElement.addEventListener("click", (e) => {
    const documentItem = e.target.closest(".documentItem");
    if (documentItem) {
      const { id } = documentItem;
      const { className } = e.target;

      if (className === "spreadButton") {
        toggleSpreadIcon(e.target);
        toggleDisplay(documentItem.querySelector(".childDocumentList"));
        toggleToSpreadDoucmentList(id.toString());
      } else if (className === "addChildDocumentButton") {
        onAddChildDocument(id);
      } else if (className === "deleteDocumentButton") {
        onDeleteDocument(id);
      } else {
        onChangeSelectedDocumentId(id);
      }
    }
  });

  this.render = () => {
    while (documentListElement.firstChild) {
      documentListElement.removeChild(documentListElement.firstChild);
    }

    const spreadDocumentList = getSpreadDocumentFromStorage();

    this.state.forEach((document) => {
      documentListElement.appendChild(
        createDocumentElement(document, spreadDocumentList)
      );
    });
  };

  this.render();
}
