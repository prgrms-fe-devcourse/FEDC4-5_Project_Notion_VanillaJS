import AddIcon from '@public/add.svg';
import CollapsedIcon from '@public/collapsed.svg';
import ExpandedIcon from '@public/expanded.svg';
import TrashIcon from '@public/trash.svg';

import { SIDEBAR } from '@consts/target';

import Component from '@core/Component';

import DocumentListEmptyItem from '../EmptyItem/DocumentListEmptyItem';
import './DocumentListItem.css';

export default class DocumentListItem extends Component {
  initComponent() {
    const { documentItem, parents, selectedId, expanded } = this.props;

    this.$documentListItem = document.createElement('li');
    this.$documentListItem.className = SIDEBAR.DOCUMENT_LIST_ITEM.ROOT;

    if (Number(documentItem.id) === Number(selectedId)) {
      this.$documentListItem.setAttribute('selected', 'true');
    }

    this.$documentListItem.dataset.id = documentItem.id;

    this.$documentListItem.innerHTML = `
      <button class="${SIDEBAR.DOCUMENT_LIST_ITEM.EXPAND_BUTTON}">
        <img src="${
          expanded[documentItem.id] ? ExpandedIcon : CollapsedIcon
        }" alt="Image" heigth="12" width="12">
      </button>
      <a class="${SIDEBAR.DOCUMENT_LIST_ITEM.TITLE}">${documentItem.title}</a>
      <div class="${SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.ROOT}">
        <button class="${
          SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.DELETE_BUTTON
        }">
          <img src="${TrashIcon}" alt="Image" heigth="14" width="14">
        </button>
        <button class="${
          SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.CREATE_INSIDE_BUTTON
        }">
          <img src="${AddIcon}" alt="Image" heigth="14" width="14">
        </button>
      </div>
    `;
    this.$documentListItem.style.paddingLeft = `${(parents.length + 1) * 10}px`;

    this.$target.appendChild(this.$documentListItem);
  }

  createDocumentItem(item, parents, selectedId, expanded) {
    const $div = document.createElement('div');

    new DocumentListItem($div, {
      documentItem: item,
      parents,
      selectedId,
      expanded,
    });

    return $div;
  }

  render() {
    const { documentItem, parents, selectedId, expanded } = this.props;
    const { id, documents: childItems } = documentItem;

    const newParents = [...parents, id];

    if (!expanded[id]) return;

    if (childItems.length === 0) {
      const $documentEmptyItem = document.createElement('div');

      new DocumentListEmptyItem($documentEmptyItem, { parents: newParents });
      this.$target.appendChild($documentEmptyItem);
      return;
    }

    childItems.forEach((document) => {
      const $documentItem = this.createDocumentItem(
        document,
        newParents,
        selectedId,
        expanded
      );
      this.$target.appendChild($documentItem);
    });
  }
}
