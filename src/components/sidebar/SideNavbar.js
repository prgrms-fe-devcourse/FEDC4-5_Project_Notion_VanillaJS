import { getDocument } from "../../api/api.js";
import LinkButton from "../linkbutton/LinkButton.js";
import DocumentList from "./DocumentList.js";
import SidebarHeader from "./SidebarHeader.js";

export default function SideNavbar({ parent, initialState }) {
  const page = document.createElement('div');
  page.id = 'documents-page';
  
  new SidebarHeader({ 
    parent: page,
    closeSideNavbar: () => {
      page.style = 'transform: translateX(-281px)';
    },
    openSideNavbar: () => {
      page.style = 'transform: translateX(0px)';
    }
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
