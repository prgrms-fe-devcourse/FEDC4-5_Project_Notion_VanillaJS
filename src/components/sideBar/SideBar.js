import SideBarItem from "./SideBarItem.js";
import DocumentList from "./DocumentList.js";

export default function SideBar({ $target, initialState }) {
  const $sideBar = document.createElement("section");
  $sideBar.setAttribute("id", "sideBar");

  $target.appendChild($sideBar);

  this.render = () => {
    const $documentList = new DocumentList({ $target: $sideBar, initialState });

    const $buttonNewPage = new SideBarItem({
      $target: $sideBar,
      text: "+ 페이지 추가",
      onClick: () => {
        request("/documents", {
          method: "POST",
          body: JSON.stringify({
            title: "제목 없음",
            parent: null,
          }),
        });
      },
    });
  };
  this.render();
}
