import SidebarHeader from './SidebarHeader.js';
import SidebarList from './SidebarList.js';
import SidebarFooter from './SidebarFooter.js';
import { request } from '../../../utils/apis/api.js';
import { push } from '../../../utils/router.js';

export default function SidebarPage({ $target, initialState }) {
  const $sidebar = document.createElement('nav');
  $sidebar.className = 'sidebar';

  this.state = initialState;

  this.setState = () => {
    getDocumentList();
    this.render();
  };

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

      const newDocument = await createDocument(document);
      push(`/documents/${newDocument.id}`);
    },
    onRemoveDocument: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      });
      push('/');
    },
  });

  new SidebarFooter({
    $target: $sidebar,
    createRootDocument: () => {
      const document = {
        title: '',
        parent: null,
      };
      createDocument(document);
      push(`/`);
    },
  });

  this.render = () => {
    getDocumentList();
    $target.prepend($sidebar);
  };

  const getDocumentList = async () => {
    const list = await request('/documents');
    sidebarList.setState(list);
  };

  const createDocument = async (document) => {
    const newDocument = await request('/documents', {
      method: 'POST',
      body: JSON.stringify(document),
    });
    return newDocument;
  };
}
