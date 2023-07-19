import { SIDEBAR } from '@consts/target';
import URL from '@consts/url';

import { history } from '@utils/router';

import { createDocument } from '@api/document';

import Component from '@core/Component';

import DocumentList from '@components/DocumentList/DocumentList';

import SidebarCreateButton from './CreateButton/SidebarCreateButton';
import './NotionSidebar.css';

export default class NotionSidebar extends Component {
  setup() {
    this.state = {
      documentId: null,
      documentList: [],
    };
  }

  initComponent() {
    this.$sidebar = document.createElement('nav');
    this.$sidebar.className = SIDEBAR.ROOT;

    this.$target.appendChild(this.$sidebar);
  }

  initChildComponents() {
    this.$createButton = new SidebarCreateButton(this.$sidebar, {
      textContent: 'New document',
      onClick: this.handleCreateButtonClick.bind(this),
    });

    const $listContainer = document.createElement('div');
    $listContainer.className = SIDEBAR.CONTAINER.LIST;
    $listContainer.innerHTML = `
      <p>documents</p>
    `;

    this.$sidebar.appendChild($listContainer);

    this.$documentList = new DocumentList($listContainer);
  }

  async handleCreateButtonClick() {
    const newDocument = await createDocument({ title: '' });
    if (!newDocument) return;

    const documentPath = URL.getDocumentDetailPath(newDocument.id);
    history.push(documentPath);
  }

  setState(nextState) {
    super.setState(nextState);

    const { documentId, documentList } = this.state;

    this.$documentList.setState({
      selectedDocumentId: documentId,
      documentList,
    });
  }
}
