import { RIGHT_ARROW_KEY, SPACEBAR_KEY, TAB_KEY } from "../../constants/constants.js";
import Component from "../../core/Component.js";
import ChildDocumentList from "../child-document-list/ChildDocumentList.js";
import parseMarkdown  from "./utils/parseMarkdown.js";
import onPressTab from "./utils/onPressTab.js";
import onPressInCodeBlock from "./utils/onPressInCodeBlock.js";

export default class Editor extends Component{
  template(){
    return `
      <input type="text" name="title" class="title" placeholder="제목없음">
      <div name="content" contentEditable="true" class ="content" 
      placeholder="내용을 입력하세요"></div>
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
    if(documents.length <= 0){
      return;
    }
    const $childDocumentList = this.$target.querySelector(".document-children");
    new ChildDocumentList($childDocumentList, {
      documents : documents,
      onClickAdd,
    })
  }

  setEvent(){
    const {onEdit, documentContent} = this.props;
    this.addEvent("input", "[name=title]", ({target}) => {
      onEdit({
        ...documentContent,
        title : target.value,
        content : document.querySelector("[name=content]").innerHTML,
      });
      document.querySelector(".selected-document-title").textContent = target.value;
    }); 

    this.addEvent("input", "[name=content]", ({target}) => {
      onEdit({
        ...documentContent,
        title :  document.querySelector("[name=title]").value,
        content : target.innerHTML,
      });
    })

    this.addEvent("keyup", "[name=content]", (e) => {
      parseMarkdown(e.key, e);
    })

    this.addEvent("keydown", "[name=content]", (e) => {
      if(e.key === TAB_KEY){
        e.preventDefault();
        onPressTab();
      }else if(e.key === SPACEBAR_KEY || e.key === RIGHT_ARROW_KEY){
        onPressInCodeBlock(e);
      }
    })
  }
}