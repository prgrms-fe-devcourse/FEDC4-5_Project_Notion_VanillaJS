import { RIGHT_ARROW_KEY_CODE, SPACEBAR_KEY_CODE, TAB_KEY_CODE } from "../constants/constants.js";
import Component from "../core/Component.js";
import { onPressInCodeBlock, onPressTab, parseMarkdown } from "../utils/markdownParser.js";
import ChildDocumentList from "./ChildDocumentList.js";

export default class Editor extends Component{
  template(){
    return `
      <input type="text" name="title" style="width:920px;">
      <div name="content" contentEditable="true" style="width:900px;"></div>
      <div class="document-children"></div> 
    `
  }

  render(){
    if(!this.props.documentContent){
      return;
    }
    const {title, content} = this.props.documentContent;
    this.$target.innerHTML = this.template();
    this.$target.querySelector("[name=title]").value = title;
    this.$target.querySelector("[name=content]").innerHTML = (content || "");
    this.$target.querySelector("[name=title]").focus();
    this.mounted();
  }

  mounted(){
    const {documentContent, onClickAdd} = this.props;
    const {documents} = documentContent;
    if(!documents || !documents.length){
      return;
    }
    const $childDocumentList = this.$target.querySelector(".document-children");
    new ChildDocumentList($childDocumentList, {
      documents : documents,
      onClickAdd,
    })
  }

  setEvent(){
    const {onEdit} = this.props;
    this.addEvent("input", "[name=title]", ({target}) => {
      onEdit({
        title : target.value,
        content : document.querySelector("[name=content]").innerHTML
      });
      document.querySelector(".selected-document-title").textContent = target.value;
    }); 

    this.addEvent("input", "[name=content]", ({target}) => {
      onEdit({
        title :  document.querySelector("[name=title]").value,
        content : target.innerHTML
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
  }
}