import { createDomElement } from "./../utils/dom.js";

export default function SideBar({ target, initialState }) {
  const divElement = createDomElement("div", "sideBar");
  target.appendChild(divElement);

  this.state = initialState;


  this.render = () => {

  };
}
