import DocumentList from "./DocumentList.js";

export default function SideBar({ $target, initialState }) {
  const $sideBar = document.createElement("section");
  $sideBar.setAttribute("id", "sideBar");

  $target.appendChild($sideBar);

  this.render = () => {
    const $documentList = new DocumentList({ $target: $sideBar, initialState });
  };
  this.render();
}
