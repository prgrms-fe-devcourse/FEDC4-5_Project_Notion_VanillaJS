import { createDomElementWithId } from "../utils/dom.js";
import DocumentList from "./DocumentList.js";

export default function SideBar({ target, initialState }) {
  const sideBarElement = createDomElementWithId("div", "sideBar");
  target.appendChild(sideBarElement);

  const headerElement = createDomElementWithId("div", "sideBar_header");
  sideBarElement.appendChild(headerElement);

  const titleElement = createDomElementWithId("div", "sideBar_title");
  sideBarElement.appendChild(titleElement);

  new DocumentList({ target: sideBarElement, initialState });

  this.state = initialState;

  this.render = () => {};
}
