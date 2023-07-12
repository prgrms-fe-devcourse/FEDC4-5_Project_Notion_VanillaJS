import Component from "../../core/Component.js";

export default class Sideber extends Component{
  template(){
    const {documents, id} = this.props;
    return `
      ${this.getDirectoryTree(documents, +id)}
      <button class="add-root">신규 문서 추가</button>
    `
  }

  setEvent(){
    const {onClickAdd, onClickDelete, onClickDocument, onClickBreadcrumb} = this.props;
    this.addEvent("click", ".add-root", () => {
      onClickAdd(null);
    })

    this.addEvent("click", ".directory-entry", ({target}) => {
      const $entry = target.closest(".directory-entry");
      const {id} = $entry.dataset;
      const {classList} = target;
    
      if(classList.contains("add-document")){
        onClickAdd(id);
      }else if(classList.contains("delete-document")){
        onClickDelete(id);
      }else if(classList.contains("selected-document-title")){
        onClickDocument(id);
      }else if(classList.contains("toggle-content")){
        onClickBreadcrumb(id);
      }else{
        onClickDocument(id);
      }
    })
  }

  getDirectoryTree(documents, selectedId){
    if(!Array.isArray(documents) || documents.length === 0){
      return '';
    }
    let resultHTML = ``;
    documents.forEach(document => {
      const {title, id} = document;
      const selectedDocumentClass = selectedId === id ? "selected-document" : "";
      const selectedDocumentTitleClass = selectedId === id ? "selected-document-title" : "";
      resultHTML += `
        <div class="directory">
          <div class="directory-entry ${selectedDocumentClass}" data-id="${id}" >
            <i class="fa-solid fa-caret-down toggle-content"></i>
            <div data-id="${id}" class="entry-title ${selectedDocumentTitleClass}">${title}</div>
            <i class="fa-solid fa-circle-plus add-document document-button"></i>
            <i class="fa-solid fa-circle-minus delete-document document-button"></i>
          </div>
          <div id="children-${id}" class="children-directory">
            ${this.getDirectoryTree(document.documents, selectedId)}
          </div>
        </div>
      `
    })
    return resultHTML;
  }
}