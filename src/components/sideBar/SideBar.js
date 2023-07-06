import { request } from "../../api.js";
import SideBarItem from "./SideBarItem.js";
import DocumentList from "./DocumentList.js";
import { push } from "../../utils/router.js";

export default function SideBar({ $target }) {
  const $sideBar = document.createElement("section");
  $sideBar.setAttribute("id", "sideBar");

  const documentList = new DocumentList({
    $target: $sideBar,
    initialState: [],
  });

  new SideBarItem({
    $target: $sideBar,
    text: "+ 페이지 추가",
    onClick: async () => {
      const createdDocument = await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: null,
        }),
      });
      documentList.setState([...documentList.state, createdDocument]);
      push(`/documents/${createdDocument.id}`);
    },
  });

  this.setState = (rootDocuments) => {
    documentList.setState(rootDocuments);
    this.render();
  };

  this.render = () => {
    $target.appendChild($sideBar);
  };
}
