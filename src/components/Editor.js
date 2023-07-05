import { RIGHT_ARROW_KEY_CODE, SPACEBAR_KEY_CODE, TAB_KEY_CODE } from "../constants/constants.js";
import Component from "../core/Component.js";
import { onPressInCodeBlock, onPressTab, parseMarkdown } from "../utils/markdownParser.js";
import ChildrenDocumentLink from "./ChildrenDocumentLink.js";

export default class Editor extends Component{
  template(){
    return `
      <input type="text" name="title" style="width:600px;">
      <div name="content" contentEditable="true" style="width:600px; height:400px;"></div>
    `
  }
  render(){
    const {title, content} = this.props.documentContent;
    this.$target.innerHTML = this.template();
    this.$target.querySelector("[name=title]").value = title;
    this.$target.querySelector("[name=content]").innerHTML = (content || "") + this.childDocumentsLinkHTML;
    this.$target.querySelector("[name=title]").focus();
  }

  get childDocumentsLinkHTML(){
    const {documents} = this.props.documentContent;
    if(!documents || !documents.length) return ``;
    return `
      <br><br>
      ${documents.map(child => `
        <div class="children-documents-link" data-id="${child.id}">
          <span>${child.title}</span>
        </div>
      `).join("")}
    `;
  }

  setEvent(){
    const {documentContent, onEditTitle, onEditContent, onClickDocument} = this.props;
    this.addEvent("input", "[name=title]", ({target}) => {
      onEditTitle({
        title : target.value,
        content : target.innerHTML.replace(/<br><br><div\sclass="children-documents-link\sdata-id=".+">\s.+/g, "")
      });
    }); 

    this.addEvent("input", "[name=content]", ({target}) => {
      onEditContent({
        title :  documentContent.title,
        content : target.innerHTML.replace(/<br><br><div\sclass="children-documents-link\sdata-id=".+">\s.+/g, "")
      });
    })

    this.addEvent("keyup", "[name=content]", (e) => {
      parseMarkdown(e.keyCode, e);
    })

    this.addEvent("keydown", "[name=content]", (e) => {
      if(e.keyCode === TAB_KEY_CODE){
        e.preventDefault();
        onPressTab();
      }else if(e.keyCode === SPACEBAR_KEY_CODE || e.keyCode === RIGHT_ARROW_KEY_CODE){
        onPressInCodeBlock(e);
      }
    })

    this.addEvent("click", ".children-documents-link", ({target}) => {
      const $div = target.closest("div");
      const {id} = $div.dataset;
      onClickDocument(id);
    })
  }
}