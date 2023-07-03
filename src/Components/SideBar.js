import { createDomElementWithId } from "../utils/dom.js";
import DocumentList from "./DocumentList.js";

export default function SideBar({
  target,
  initialState,
  onAddRootDocument,
  onChangeSelectedDocumentId,
  onAddChildDocument,
  onDeleteDocument,
}) {
  const sideBarElement = createDomElementWithId("div", "sideBar");
  target.appendChild(sideBarElement);

  const headerElement = createDomElementWithId("div", "sideBar_header");
  sideBarElement.appendChild(headerElement);

  const titleElement = createDomElementWithId("div", "sideBar_title");
  titleElement.innerHTML = `
    <span id="sideBar_title_text">document List</span>
    <button id="addRootDocumentButton">+</button>
  `;
  sideBarElement.appendChild(titleElement);

  const addRootDocumentButtonElement = document.querySelector(
    "#addRootDocumentButton"
  );

  console.log(addRootDocumentButtonElement);
  addRootDocumentButtonElement.addEventListener("click", async () => {
    await onAddRootDocument();
  });

  const documentList = new DocumentList({
    target: sideBarElement,
    initialState,
    onChangeSelectedDocumentId,
    onAddChildDocument,
    onDeleteDocument,
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    documentList.setState(nextState);
    this.render();
  };

  this.render = () => {};
}
