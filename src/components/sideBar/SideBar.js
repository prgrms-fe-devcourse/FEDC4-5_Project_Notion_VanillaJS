import { createDocument } from "../../api.js";
import SideBarItem from "./SideBarItem.js";
import DocumentList from "./DocumentList.js";
import { push } from "../../utils/router.js";

export default function SideBar({ $target, initialState }) {
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
      const createdDocument = await createDocument(null);
      documentList.setState([...documentList.state, createdDocument]);
      push(`/documents/${createdDocument.id}`);
    },
  });

  this.state = initialState;

  this.setState = (rootDocuments) => {
    this.state = rootDocuments;
    documentList.setState(rootDocuments);
    this.render();
  };

  this.render = () => {
    $target.appendChild($sideBar);
  };
}
