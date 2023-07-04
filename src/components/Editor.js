import Component from "../core/Component.js";
import { onPressInCodeBlock, onPressTab, parseMarkdown } from "../utils/markdownParser.js";

export default class Editor extends Component{
  template(){
    return `
      <input type="text" name="title" style="width:600px;">
      <div name="content" contentEditable="true" style="width:600px; height:400px; border: 1px solid black;">
      </div>
    `
  }

  render(){
    const {title, content} = this.props.documentContent;
    
    const splitedContent = content?.split("<div>");
    let contentParsed = null;
    if(splitedContent && splitedContent[0]){
      contentParsed = `<div>${splitedContent[0]}</div>${splitedContent.slice(1).map(line => `<div>${line}`).join("")}`
    }else{
      contentParsed = content;
    }
    this.$target.innerHTML = this.template();
    this.$target.querySelector("[name=title]").value = title;
    this.$target.querySelector("[name=content]").innerHTML = contentParsed;
    this.$target.querySelector("[name=title]").focus();
  }

  setEvent(){
    const {documentContent, onEditTitle, onEditContent} = this.props;
    this.addEvent("input", "[name=title]", ({target}) => {
      onEditTitle({
        ...documentContent,
        title : target.value
      }, target);
    }); 

    this.addEvent("input", "[name=content]", ({target}) => {
      onEditContent({
        ...documentContent,
        content : target.innerHTML
      });
    })

    this.addEvent("keyup", "[name=content]", (e) => {
      parseMarkdown(e.keyCode, e);
    })

    this.addEvent("keydown", "[name=content]", (e) => {
      console.log(e.keyCode);
      if(e.keyCode === 9){
        e.preventDefault();
        onPressTab();
      }else if(e.keyCode === 32 || e.keyCode === 39){
        onPressInCodeBlock(e);
      }
    })
  }
}