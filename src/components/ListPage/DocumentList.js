import {
  setOpenDocument,
  setCloseDocumet,
  getCurrOpenState,
} from '../../utils/StorageHandler.js';
import NoneChild from './NoneChild.js';
import { MAX_DOCUMENT_DEPTH } from '../../utils/constant.js';

export default class DocumentList {
  constructor(
    $target,
    initialState,
    selectDocument,
    createDocument,
    removeDocument,
  ) {
    this.$target = $target;
    this.state = {
      ...initialState,
      openStatus: getCurrOpenState(initialState.documentInfo.id),
    };
    console.log(this.state.openStatus);
    this.selectDocument = selectDocument;
    this.createDocument = createDocument;
    this.removeDocument = removeDocument;
    this.$ul = null;
    this.initUl();
    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.state.openStatus === true
      ? setOpenDocument(this.state.documentInfo.id)
      : setCloseDocumet(this.state.documentInfo.id);
    this.render();
  };

  initUl = () => {
    this.$ul = document.createElement('ul');
    this.$ul.className = 'document-ul';
    this.$target.appendChild(this.$ul);
    this.clickListEvent();
  };

  render = () => {
    const { documentInfo, depth, openStatus } = this.state;

    this.$ul.innerHTML = `
      <li data-documentId=${documentInfo.id} 
          class='document-li'
          style='padding-left: ${depth * 15}px'>
        <button class='open-toggle-button'>
          ${openStatus === true ? '▼' : '▶︎'}
        </button>
        <span>${
          documentInfo.title === null ? '제목 없음' : documentInfo.title
        }</span>
        <button class='create-toggle-button'>﹢</button>
        <button class='remove-toggle-button'>X</button>
      </li>
    `;
    if (openStatus === true) {
      this.renderChildDocument();
    }
  };

  renderChildDocument = () => {
    const children = this.state.documentInfo.documents;

    if (children.length === 0) {
      new NoneChild(this.$ul, this.state.depth + 1);
      return;
    }

    children.forEach((documentInfo) => {
      const initialState = {
        documentInfo: documentInfo,
        depth: this.state.depth + 1,
      };
      new DocumentList(
        this.$ul,
        initialState,
        this.selectDocument,
        this.createDocument,
        this.removeDocument,
      );
    });
  };

  clickListEvent = () => {
    this.$ul.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      const $li = event.target.closest('li');
      const $button = event.target.closest('button');
      const documentId = $li?.dataset.documentid;

      if ($li === null && $button === null) {
        return;
      }
      if ($button !== null) {
        this.checkButtonType($button, documentId);
        return;
      }
      if (documentId !== undefined) {
        this.selectDocument(documentId);
      }
    });
  };

  checkButtonType = ($button, docuemntId) => {
    if ($button.classList.contains('open-toggle-button') === true) {
      this.clickOpenToggleButton();
      return;
    }
    if ($button.classList.contains('create-toggle-button') === true) {
      this.clickCreateToggleButton(docuemntId);
      return;
    }
    if ($button.classList.contains('remove-toggle-button') === true) {
      this.clickRemoveToggleButton(docuemntId);
      return;
    }
  };

  clickOpenToggleButton = () => {
    const nextState = {
      ...this.state,
      openStatus: !this.state.openStatus,
    };
    this.setState(nextState);
  };

  clickCreateToggleButton = (docuemntId) => {
    if (this.state.depth === MAX_DOCUMENT_DEPTH) {
      alert('더이상 하위 도큐먼트를 만들 수 없습니다.');
      return;
    }
    const nextState = {
      ...this.state,
      openStatus: true,
    };
    this.setState(nextState);
    this.createDocument(docuemntId);
  };

  clickRemoveToggleButton = (docuemntId) => {
    this.$target.removeChild(this.$ul);
    setCloseDocumet(docuemntId);
    this.removeDocument(docuemntId);
  };
}
