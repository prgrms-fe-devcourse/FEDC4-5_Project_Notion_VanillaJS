import Component from "../core/Component.js";

export default class ChildrenDocumentLink extends Component{
  template(){
    console.log(this.props);
    const documents = this.props.documentContent?.documents || [];
    console.log(documents);
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