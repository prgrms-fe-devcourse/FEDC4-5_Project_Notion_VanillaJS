import Component from "../core/Component.js";
import { parseMarkdown } from "../utils/markdownParser.js";

export default class Editor extends Component{
  template(){
    return `
      <input type="text" name="title" style="width:600px;">
      <div name="content" contentEditable="true" style="width:600px; height:400px; border: 1px solid black;"></textarea>
    `
  }

  render(){
    this.$target.innerHTML = this.template();
    this.$target.querySelector("[name=title]").value = this.props.title;
    this.$target.querySelector("[name=content]").innerHTML = this.props.content;
    this.$target.querySelector("[name=title]").focus();
  }

  setEvent(){
    const {title, content, onEditTitle, onEditContent} = this.props;
    this.addEvent("input", "[name=title]", ({target}) => {
      onEditTitle({
        title : target.value,
        content
      }, target);
    });

    this.addEvent("input", "[name=content]", ({target}) => {
      onEditContent({
        title,
        content : target.innerHTML
      }, target);
    })

    this.addEvent("keydown", "[name=content]", (e) => {
      parseMarkdown(e.keyCode);
    })
  }
}