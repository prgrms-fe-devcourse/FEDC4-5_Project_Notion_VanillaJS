import { deleteDocument, getDocument, postDocument } from "../../api/api.js";
import { push } from "../../route/router.js";
import DocumentList from "./DocumentList.js";
import LinkButton from "../linkbutton/LinkButton.js";
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

  const documentList = new DocumentList({
    parent: page,
    initialState,
    onDeleteDocument: async (id) => {
      await deleteDocument(`/documents/${id}`);
      this.setState();
    },
  })

  new LinkButton({
    $target: page,
    initialState: {
      text: '+ 페이지 추가',
      id: 'add-document-button'
    },
    action: async () => {
      const { id } = await postDocument('/documents');
      push(`/documents/${id}`);
      this.setState();
    }
  })
  
  this.setState = async () => {
    const documents = await getDocument('/documents');

    documentList.setState(documents);
  }

  this.render = () => {
    parent.appendChild(page);
  }
}
