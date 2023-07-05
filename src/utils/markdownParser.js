import {DUMMY_CHARACTER, SPACEBAR_KEY_CODE, ENTER_KEY_CODE, BACKTICK_KEY_CODE} from "../constants/constants.js"

const selection = window.getSelection();
let offset = null;

export function insertElementInEditor($element){
    const range = selection.getRangeAt(0);
    range.selectNode(selection.anchorNode);
    range.deleteContents();
    range.insertNode($element);
    range.setStartAfter($element);
    range.setEndAfter($element);
    selection.removeAllRanges();
    selection.addRange(range);
    range.detach();
}

export function onPressTab(){
  const $editor = document.querySelector("[name=content]");
  const $doc = $editor.ownerDocument.defaultView;
  const docSelection = $doc.getSelection();
  const range = docSelection.getRangeAt(0);
  const tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
  range.insertNode(tabNode);
  range.setStartAfter(tabNode);
  range.setEndAfter(tabNode);
  docSelection.removeAllRanges();
  docSelection.addRange(range);
  return;
}

export function onPressInCodeBlock(e){
  const $currentParent = selection.anchorNode.parentElement;
  const $current = selection.anchorNode;
  if($currentParent.classList.contains("code-block") && 
  selection.anchorOffset === $current.length){
    e.preventDefault();
    const $dummy = document.createTextNode(DUMMY_CHARACTER);
    const range = selection.getRangeAt(0);
    range.setStartAfter($currentParent);
    range.setEndAfter($currentParent);
    range.insertNode($dummy);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

export function parseMarkdown(key){
  const line = selection.anchorNode.textContent;
  if(key === SPACEBAR_KEY_CODE){
    if(line.match(/^\#/g)){
      const hashTagCount = (line.match(/#/g)).length;
      if(hashTagCount > 3) return;
      const $header = document.createElement("div");
      $header.classList.add(`h${hashTagCount}`, "editor-line");
      $header.textContent = DUMMY_CHARACTER;
      insertElementInEditor($header);
      $header.textContent = line.substring(hashTagCount) + DUMMY_CHARACTER;
    }
  }else if(key === ENTER_KEY_CODE){
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
    }else if(range.commonAncestorContainer.classList.contains("editor-line")){
      const $deleteDiv = (range.commonAncestorContainer);
      const $parentDiv = (range.commonAncestorContainer.parentElement);
      const $newDiv = document.createElement("div");
      $newDiv.innerHTML = `<br>`;
      $parentDiv.replaceChild($newDiv, $deleteDiv);
    }
  }else if(key === BACKTICK_KEY_CODE){
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

      range.setStart($divParent.lastChild, startOffset);
      range.setEnd($divParent.lastChild, endOffset);

      const extractedText = range.extractContents().textContent.substring(1);
      $span.classList.add("code-block");
      $span.textContent = extractedText.substring(0, extractedText.length - 1);
      
      range.insertNode($span);
      range.setStartAfter($span);
      range.setEndAfter($span);
      selection.removeAllRanges();
      selection.addRange(range);
      offset = null;
    }
  }
}

