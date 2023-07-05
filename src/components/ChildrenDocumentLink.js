import Component from "../core/Component.js";

export default class ChildrenDocumentLink extends Component{
  template(){
    console.log("d");
    const documents = this.props.documentContent?.documents || [];
    return `
      <ul>${documents.map((child) => {
        return `<li data-id="${child.id}">${child.title}</li>`
      }).join("")}
      </ul>
    `;
  } 

  setEvent(){
    const {onClickDocument} = this.props;
    this.addEvent("click", "li", ({target}) => {
      const {id} = target.dataset;
      onClickDocument(id);
    })
  }
}