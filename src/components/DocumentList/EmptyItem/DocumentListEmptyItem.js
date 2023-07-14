import { SIDEBAR } from '@consts/target';

import Component from '@core/Component';

import './DocumentListEmptyItem.css';

export default class DocumentListEmptyItem extends Component {
  initComponent() {
    const { parents } = this.props;

    this.$documentListEmptyItem = document.createElement('li');
    this.$documentListEmptyItem.className = SIDEBAR.DOCUMENT_LIST_ITEM.EMPTY;

    this.$documentListEmptyItem.innerHTML = `
      <a class="${SIDEBAR.DOCUMENT_LIST_ITEM.TITLE}">No documents inside</a>
    `;
    this.$documentListEmptyItem.style.paddingLeft = `${
      parents.length * 10 + 22
    }px`;

    this.$target.appendChild(this.$documentListEmptyItem);
  }
}
