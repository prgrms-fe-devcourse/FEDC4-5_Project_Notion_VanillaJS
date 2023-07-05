import { request } from "../../api.js";
import SideBarItem from "./SideBarItem.js";
import DocumentList from "./DocumentList.js";

export default function SideBar({ $target }) {
  const $sideBar = document.createElement("section");
  $sideBar.setAttribute("id", "sideBar");

  const documentList = new DocumentList({
    $target: $sideBar,
    initialState: [],
  });

  const $buttonNewPage = new SideBarItem({
    $target: $sideBar,
    text: "+ 페이지 추가",
    onClick: async () => {
      const newDocument = {
        title: "제목 없음",
        parent: null,
      };
      documentList.setState([...documentList.state, newDocument]);
      await request("/documents", {
        method: "POST",
        body: JSON.stringify(newDocument),
      });
    },
  });

  this.setState = async () => {
    const rootDocuments = await request("/documents");
    documentList.setState(rootDocuments);
    this.render();
  };

  this.render = () => {
    $target.appendChild($sideBar);
  };
}
