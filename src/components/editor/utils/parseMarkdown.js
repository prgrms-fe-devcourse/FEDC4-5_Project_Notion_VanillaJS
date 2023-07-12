import {DUMMY_CHARACTER, SPACEBAR_KEY, ENTER_KEY, BACKTICK_KEY} from "../../../constants/constants.js"
import insertElementInEditor from "./insertElementInEditor.js";

const selection = window.getSelection();
let offset = null;

export default function parseMarkdown(key){
  const line = selection.anchorNode.textContent;
  if(key === SPACEBAR_KEY){
    if(line.match(/^\#/g)){
      const hashTagCount = (line.match(/#/g)).length;
      if(hashTagCount > 3) return;
      const $header = document.createElement("div");
      $header.classList.add(`h${hashTagCount}`, "editor-line");
      $header.textContent = DUMMY_CHARACTER;
      insertElementInEditor($header);
      $header.textContent = line.substring(hashTagCount) + DUMMY_CHARACTER;
    }
  }else if(key === ENTER_KEY){
    const range = selection.getRangeAt(0);
    const $br = document.createElement("br");
    if(range.commonAncestorContainer.nodeName === "SPAN"){
      const $div = (range.commonAncestorContainer.parentElement);
      $div.removeChild($div.firstChild);
      range.insertNode($br);
      range.setStartAfter($div);
      range.setEndAfter($div);
      selection.removeAllRanges();
      selection.addRange(range);
    }else if(range.commonAncestorContainer &&
      range.commonAncestorContainer.classList.contains("editor-line")){
      const $deleteDiv = (range.commonAncestorContainer);
      const $parentDiv = (range.commonAncestorContainer.parentElement);
      const $newDiv = document.createElement("div");
      $newDiv.innerHTML = `<br>`;
      $parentDiv.replaceChild($newDiv, $deleteDiv);
    }
  }else if(key === BACKTICK_KEY){
    const range = selection.getRangeAt(0);
    let $divParent = range.commonAncestorContainer.parentElement;
    while($divParent.nodeName !== "DIV"){
      $divParent = $divParent.parentElement;
    }
    if(selection.anchorNode.length !== selection.anchorOffset){
      offset = null;
      return;
    }
    if(!offset){
      offset = selection.anchorOffset - 1;
      return;
    }else{
      const startOffset = offset;
      const endOffset = selection.anchorOffset;
      const $span = document.createElement("span");
      const $dummy = document.createTextNode(DUMMY_CHARACTER);

      range.setStart(selection.anchorNode, startOffset);
      range.setEnd(selection.anchorNode, endOffset);

      const extractedText = range.extractContents().textContent.substring(1);
      $span.classList.add("code-block");
      $span.textContent = extractedText.substring(0, extractedText.length - 1);
      
      range.insertNode($span);
      range.setStartAfter($span);
      range.setEndAfter($span);
      range.insertNode($dummy);
      range.setStartBefore($dummy);
      range.setEndAfter($dummy);
      selection.removeAllRanges();
      selection.addRange(range);
      offset = null;
    }
  }
}

