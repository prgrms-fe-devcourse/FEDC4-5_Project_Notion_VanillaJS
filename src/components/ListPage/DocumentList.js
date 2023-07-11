import { setOpenDocument, setCloseDocumet, getCurrOpenState,} from '../../utils/StorageHandler.js';
import NoneChild from './NoneChild.js';

export default class DocumentList {
  constructor($target, initialState, selectDocument, createDocument, removeDocument) {
    this.$target = $target;
    this.state = {
      ...initialState,
      openStatus: getCurrOpenState(initialState.documentInfo.id),
    };
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
  };

  render = () => {
    this.$ul.innerHTML = `
      <li data-documentId=${this.state.documentInfo.id} 
          class='document-li depth-0${this.state.depth}'>
        <button class='open-toggle-button'>
          ${this.state.openStatus === true ? '▼' : '▶︎'}
        </button>
        <span>${
          this.state.documentInfo.title === null
            ? '제목 없음'
            : this.state.documentInfo.title
        }</span>
        <button class='create-toggle-button'>﹢</button>
        <button class='remove-toggle-button'>X</button>
      </li>
    `;
    if (this.state.openStatus === true) {
      this.renderChildDocument();
    }
    this.clickListEvent();
  };

  renderChildDocument = () => {
    if (this.state.documentInfo.documents.length === 0) {
      new NoneChild(this.$ul, this.state.depth + 1);
      return;
    }

    this.state.documentInfo.documents.forEach((documentInfo) => {
      const initialState = {
        documentInfo: documentInfo,
        depth: this.state.depth + 1,
      };
      new DocumentList(
        this.$ul,
        initialState,
        this.selectDocument,
        this.createDocument,
        this.removeDocument
      );
    });
  };

  clickListEvent = () => {
    this.$ul.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      const $li = event.target.closest('li');
      const $button = event.target.closest('button');
      
      if ($li === null) {
        return;
      }
      if ($li.className.startsWith('document-li') === true && $button === null) {
        const documentId = $li?.dataset.documentid;
        this.selectDocument(documentId);
      } 
      else if ($button !== null) {
        this.checkButtonType($button, documentId);
      }
    });
  };

  checkButtonType = ($button, docuemntId) => {
    if ($button.className === 'open-toggle-button') {
      this.clickOpenToggleButton();
    } else if ($button.className === 'create-toggle-button') {
      this.clickCreateToggleButton(docuemntId);
    } else if ($button.className === 'remove-toggle-button') {
      this.clickRemoveToggleButton(docuemntId);
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
    if (this.state.depth === 9) {
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
