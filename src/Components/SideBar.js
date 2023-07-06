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

  headerElement.addEventListener("click", (e) => {
    const { id } = e.target;
    if (id === "sideBar_header_icon" || id === "sideBar_header_title") {
      onChangeSelectedDocumentId();
    }
  });

  headerElement.innerHTML = `
    <img id="sideBar_header_icon" src="src/icons/notion-icon.png" alt="My Image">
    <div id="sideBar_header_title">Notion</div>`;

  const titleElement = createDomElementWithId("div", "sideBar_title");
  titleElement.innerHTML = `
    <div id="sideBar_title_text">document List</div>
    <button id="addRootDocumentButton">+</button>
  `;
  sideBarElement.appendChild(titleElement);

  const addRootDocumentButtonElement = document.querySelector(
    "#addRootDocumentButton"
  );
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
