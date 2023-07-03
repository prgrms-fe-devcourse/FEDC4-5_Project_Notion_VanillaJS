import SideBarItem from "./SideBarItem.js";
import { request } from "../../api.js";

export default function DocumentList({ $target, initialState }) {
  const $documentList = document.createElement("ul");
  $documentList.setAttribute("id", "documentList");
  $target.appendChild($documentList);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  console.log("this.state", this.state);

  this.render = () => {
    const $buttonNewPage = new SideBarItem({
      $target: $documentList,
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
