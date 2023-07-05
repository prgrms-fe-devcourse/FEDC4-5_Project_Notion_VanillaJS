import SideBarFooter from "./SideBarFooter.js";
import SidebarHeader from "./SideBarHeader.js";
import SidebarList from "./SideBarList.js";

import {
  getRootDocuments,
  createDocument,
  deleteDocument,
  getDocument,
} from "../../api/api.js";
import { push } from "../../router.js";

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
      const selectedIds = [];
      const selectedDocument = await getDocument(id);
      const { documents } = selectedDocument;

      const getChildrenDocumentId = (childrenDocuments) => {
        childrenDocuments.forEach(({ id, documents }) => {
          selectedIds.push(id);

          if (documents.length) {
            getChildrenDocumentId(documents);
          }
        });
      };

      if (documents.length) {
        getChildrenDocumentId(documents);
      }

      selectedIds.reverse();
      selectedIds.push(id);

      for (const selectedId of selectedIds) {
        await deleteDocument(selectedId);
      }

      this.setState();
      push("/");
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
