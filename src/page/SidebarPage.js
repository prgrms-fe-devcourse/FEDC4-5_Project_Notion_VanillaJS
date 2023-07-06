import DocumentList from "./sidebar/DocumentList.js";
import { getApi } from "../utils/api.js";

export default function SidebarPage({ $target, username }) {
  const $page = document.createElement("div");

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    username,
  });

  this.setState = async () => {
    const document = await getApi(username);
    documentList.setState(document);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
