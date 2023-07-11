import { checkRouteValidation } from '../utils/Validation.js';
import { getContentAPI, editAPI } from '../utils/API.js';
import DocumentContent from '../components/EditPage/DocumentContent.js';
import ChildList from '../components/EditPage/ChildList.js';

export default class EditPage {
  constructor(target, initialState, selectDocument, reflectTitleChange) {
    this.$target = target;
    this.state = { pathname: initialState, documentContent: null };
    this.selectDocument = selectDocument;
    this.reflectTitleChange = reflectTitleChange;
    this.$div = null;
    this.$documentContent = null;
    this.$childList = null;
    this.timer = null;
    this.initDiv();
  }

  setPathName = async(pathname) => {
    this.state = {
      ...this.state,
      pathname
    }
    this.fetchContent();
  }
  
  setDocumentContent = (documentContent) => {
    this.state = {
      ...this.state,
      documentContent
    }
    this.$documentContent.setState(this.state.documentContent);
    this.$childList.setState(this.state.documentContent.documents);
  }

  fetchContent = async () => {
    if (checkRouteValidation(this.state.pathname) === true) {
      const documentContent = await getContentAPI(this.state.pathname);
      this.setDocumentContent(documentContent);
    } else {
      this.initDiv();
    }
  };

  saveTitle = async(editedDocument) => {
    await editAPI(this.state.pathname, editedDocument);
    this.reflectTitleChange();
  };

  saveContent = (editedDocument) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(async() => {
      await editAPI(this.state.pathname, editedDocument);
    }, 200);
  }

  initDiv = () => {
    const $preDiv = document.querySelector('.content-page-container');

    if ($preDiv !== null) {
      this.$target.removeChild($preDiv);
    }
    this.$div = document.createElement('div');
    this.$div.className = 'content-page-container';
    this.$target.appendChild(this.$div);

    this.render();
  };

  render = () => {
    const initialState = null;
    
    this.$documentContent = new DocumentContent(
      this.$div,
      initialState,
      this.saveTitle,
      this.saveContent
    );
    this.$childList = new ChildList(
      this.$div,
      initialState,
      this.selectDocument
    )
  }
}
