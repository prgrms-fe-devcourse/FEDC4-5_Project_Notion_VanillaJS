import SideBarFooter from "./SideBarFooter.js";
import SidebarHeader from "./SideBarHeader.js";
import SidebarList from "./SideBarList.js";

import {
  getRootDocuments,
  createDocument,
  deleteDocument,
} from "../../api/api.js";

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");

  this.setState = async () => {
    const documents = await getRootDocuments();
    console.log(documents);
    sidebarList.setState(documents);
  };

  new SidebarHeader({
    $target: $sidebar,
    initialState: "sukvvon",
  });

  const sidebarList = new SidebarList({
    $target: $sidebar,
    initialState: [],
    onAddDocument: async (id) => {
      const newDocument = {
        title: "제목 없음",
        parent: id,
      };

      await createDocument(newDocument);
      this.setState();
    },
    onDeleteDocument: async (id) => {
      await deleteDocument(id);
      this.setState();
    },
  });

  new SideBarFooter({
    $target: $sidebar,
    onAddRootDocumnet: async (newDocument) => {
      await createDocument(newDocument);
      this.setState();
    },
  });

  this.render = () => {
    $target.appendChild($sidebar);
  };

  this.render();
}
