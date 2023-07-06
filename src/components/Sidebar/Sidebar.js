import SidebarFooter from "./SidebarFooter.js";
import SidebarHeader from "./SidebarHeader.js";
import SidebarList from "./SidebarList.js";

import {
  getRootDocuments,
  createDocument,
  deleteDocument,
  getDocument,
} from "../../api/api.js";
import { push } from "../../router.js";

export default function Sidebar({ $target, onResetDocumentState }) {
  const $sidebar = document.createElement("div");

  $sidebar.classList.add("sidebar");

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
        title: "",
        parent: id,
      };
      const createdDocument = await createDocument(newDocument);

      this.setState();
      push(`/documents/${createdDocument.id}`);
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
      onResetDocumentState();
      push("/");
    },
  });

  new SidebarFooter({
    $target: $sidebar,
    onAddRootDocument: async (newDocument) => {
      const createdDocument = await createDocument(newDocument);

      this.setState();
      push(`/documents/${createdDocument.id}`);
    },
  });

  this.render = () => {
    $target.appendChild($sidebar);
  };

  this.render();
}
