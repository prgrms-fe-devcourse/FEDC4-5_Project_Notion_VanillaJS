import Component from "../core/Component.js";

export default class ChildDocumentList extends Component{
  template(){
    const {documents} = this.props;
    return `
      <div name="child-list" contentEditable="true" style="width:600px;">
        ${documents.map(child => `
          <div class="children-documents-link" data-id="${child.id}">
            <span>${child.title}</span>
          </div>
        `).join("")}
      </div>
    `;
  }

  setEvent(){
    const {onClickAdd} = this.props;
    this.addEvent("click", ".children-documents-link", ({target}) => {
      const $div = target.closest(".children-documents-link");
      const {id} = $div.dataset;
      onClickAdd(id);
    })
  }
}