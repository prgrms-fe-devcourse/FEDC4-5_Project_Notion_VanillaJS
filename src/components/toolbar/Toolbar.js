import Component from "../../core/Component.js";
import {applyChildElementButtonStyle,  applyChildSpanElementButtonStyle } from "./utils/applyButtonStyle.js";

export default class Toolbar extends Component{
  template(){
    return `
      <button class="bold">B</button>
      <button class="italic">i</button>
      <button class="underline">U</button>
      <button class="line-through">L</button>
      <button class="code-block">&lt;\/&gt;</button>
    `;
  }

  setEvent(){
    const {onEdit} = this.props;
    const selection = document.getSelection();
    this.addEvent("click", "button", ({target}) => {
      const {classList : buttonType} = target;
      const range = selection.getRangeAt(0);
      const $parent = range.commonAncestorContainer.parentElement;
      if($parent.nodeName === "DIV"){
        applyChildElementButtonStyle(buttonType);
      }else if($parent.nodeName === "SPAN"){
        applyChildSpanElementButtonStyle(buttonType);
      }
      onEdit({
        title : document.querySelector("[name=title]").value,
        content : document.querySelector("[name=content]").innerHTML
      })      
    })
  }
}