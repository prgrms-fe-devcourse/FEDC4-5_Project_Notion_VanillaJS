import Component from "../core/Component.js";

export default class Sideber extends Component{
  template(){
    const {documents, id} = this.props;
    return `
      <button class="add-root">+</button>
      ${this.getDirectoryTree(documents, +id)} 
    `
  }

  setEvent(){
    const {onClickAdd, onClickDelete, onClickDocument} = this.props;
    this.$target.addEventListener("click", (e) => {
      const {className} = e.target;
      const $li = e.target.closest("li");
      if(className === "add-root"){
        onClickAdd(null);
        return;
      }

      if($li){
        const {id} = $li.dataset;
        if(className === "add-document"){
          onClickAdd(id);
        }else if(className === "delete-document"){
          onClickDelete(id);
        }else{
          onClickDocument(id);
        }
      }
    })
  }

  getDirectoryTree(documents, selectedId){
    if(!Array.isArray(documents) || documents.length === 0){
      return ``;
    }
    let ret = ``;
    documents.forEach(document => {
      const {title, id} = document;
      ret += `
      <ul>
        <li data-id="${id}" ${id === selectedId ? 'class="selected-document"' : ''}>
          <span ${id === selectedId ? 'class="selected-document-span"' : ''}>${title}</span>
          <button class="add-document">+</button>
          <button class="delete-document">X</button>
        </li>
      `
      ret += this.getDirectoryTree(document.documents, selectedId);
      ret += `</ul>`
    })
    return ret;
  }
}