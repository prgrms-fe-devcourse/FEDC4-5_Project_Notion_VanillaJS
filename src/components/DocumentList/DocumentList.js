import { SIDEBAR } from '@consts/target';

import { createDocument, deleteDocument } from '@api/document';

import sidebarStorage from '@utils/localStorage/sidebarStorage';
import { history } from '@utils/router';

import Component from '@core/Component';

import DocumentListItem from '@components/DocumentList/Item/DocumentListItem';

import './DocumentList.css';

export default class DocumentList extends Component {
  setup() {
    this.state = {
      documentId: null,
      documentList: [],
      expanded: {},
    };
  }

  initComponent() {
    this.$documentList = document.createElement('ul');
    this.$documentList.className = SIDEBAR.DOCUMENT_LIST;

    this.$target.appendChild(this.$documentList);
  }

  handleExpandButtonClick = (id) => {
    const { expanded } = this.state;
    expanded[id] = !expanded[id];

    this.setState({ expanded });
  };

  handleCreateIndsideButtonClick = async (id) => {
    const newDocument = await createDocument({ title: '', parent: id });
    history.push(`/documents/${newDocument.id}`);
  };

  hanldeDeleteButtonClick = async (id) => {
    await deleteDocument(id);
    history.push('/');
  };

  setEvent() {
    this.$documentList.addEventListener('click', ({ target }) => {
      const $li = target.closest('li');

      if (!$li) return;
      if ($li.className === SIDEBAR.DOCUMENT_LIST_ITEM.EMPTY) return;

      const { id } = $li.dataset;

      const $button = target.closest('button');
      if (!$button) {
        history.push(`/documents/${id}`);
        return;
      }
      const { className } = $button;

      if (className === SIDEBAR.DOCUMENT_LIST_ITEM.EXPAND_BUTTON) {
        this.handleExpandButtonClick(id);
        return;
      }

      if (
        className === SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.DELETE_BUTTON
      ) {
        this.hanldeDeleteButtonClick(id);
        return;
      }

      if (
        className ===
        SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.CREATE_INSIDE_BUTTON
      ) {
        this.handleCreateIndsideButtonClick(id);
        return;
      }

      history.push(`/documents/${id}`);
    });
  }

  setState(newState) {
    const { documentList } = newState;

    if (documentList) {
      const { expandedState } = sidebarStorage.getSidebarDataItem();
      documentList.forEach(({ id }) => {
        expandedState[id] = expandedState[id] ?? false;
      });

      this.state = {
        ...this.state,
        expanded: expandedState,
      };

      sidebarStorage.setSidebarDataItem({ expandedState });
    }

    const { expanded } = newState;

    if (expanded) {
      sidebarStorage.setSidebarDataItem({ expandedState: expanded });
    }

    super.setState(newState);
  }

  render() {
    const { documentId, documentList, expanded } = this.state;

    this.$documentList.innerHTML = '';
    documentList.forEach((doc) => {
      const $div = document.createElement('li');

      new DocumentListItem($div, {
        documentItem: doc,
        parents: [],
        selectedId: documentId,
        expanded,
      });

      this.$documentList.appendChild($div);
    });
  }
}
