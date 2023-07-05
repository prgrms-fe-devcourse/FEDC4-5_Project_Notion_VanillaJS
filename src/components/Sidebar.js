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
    this.addEvent("click", ".add-root", () => {
      onClickAdd(null);
    })

    this.addEvent("click", "li", ({target}) => {
      const $li = target.closest("li");
      const {id} = $li.dataset;
      const {className} = target;

      switch(className){
        case "add-document" : onClickAdd(id);
        break;

        case "delete-document" : onClickDelete(id);
        break;

        default : onClickDocument(id);
        break;
      }
    })
  }

  getDirectoryTree(documents, selectedId){
    if(!Array.isArray(documents) || documents.length === 0){
      return ``;
    }
    let resultHTML = ``;
    documents.forEach(document => {
      const {title, id} = document;
      resultHTML += `
      <ul>
        <li data-id="${id}" ${id === selectedId ? 'class="selected-document"' : ''}>
          <span data-id="${id}" ${id === selectedId ? 'class="selected-document-span"' : ''}>${title}</span>
          <button class="add-document">+</button>
          <button class="delete-document">X</button>
        </li>
      `
      resultHTML += this.getDirectoryTree(document.documents, selectedId);
      resultHTML += `</ul>`
    })
    return resultHTML;
  }
}