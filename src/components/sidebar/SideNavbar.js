import { getDocument } from "../../api/api.js";
import LinkButton from "../linkbutton/LinkButton.js";
import DocumentList from "./DocumentList.js";
import SidebarHeader from "./SidebarHeader.js";

export default function SideNavbar({ parent, initialState }) {
  const page = document.createElement('div');
  page.id = 'documents-page';
  
  new SidebarHeader({ 
    parent: page,
  })

  new DocumentList({
    parent: page,
    initialState,
    onDeleteDocument: async (id) => {
      await deleteDocument(`/documents/${id}`);
      this.setState();
    },
  })

  new LinkButton({
    $target: page,
  })

  this.render = () => {
    parent.appendChild(page);
  }
}
