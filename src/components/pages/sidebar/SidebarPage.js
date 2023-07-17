import SidebarHeader from './SidebarHeader.js';
import SidebarList from './SidebarList.js';
import SidebarFooter from './SidebarFooter.js';
import { getDocumentList, createDocument } from '../../../apis/api.js';
import { push } from '../../../utils/router.js';

export default function SidebarPage({ $target, initialState }) {
  const $sidebar = document.createElement('nav');
  $sidebar.className = 'sidebar';

  this.state = initialState;

  new SidebarHeader({
    $target: $sidebar,
  });

  const sidebarList = new SidebarList({
    $target: $sidebar,
    initialState,
    onSelect: (id) => {
      push(`/documents/${id}`);
    },
    onCreateDocument: async (parentId) => {
      const document = {
        title: '',
        parent: parentId,
      };

      const newDocumentId = await createDocument(document);
      push(`/documents/${newDocumentId}`);
    },
  });

  new SidebarFooter({
    $target: $sidebar,
    createRootDocument: async () => {
      const document = {
        title: '',
        parent: null,
      };

      const newDocumentId = await createDocument(document);
      push(`/documents/${newDocumentId}`);
    },
  });

  this.render = async () => {
    sidebarList.setState(await getDocumentList());
    $target.prepend($sidebar);
  };
}
