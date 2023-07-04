const DUMMY_CHARACTER = "\u00a0";
const SPACEBAR_KEY_CODE = 32;
const BACKTICK_KEY_CODE = 192;
const ENTER_KEY_CODE = 13;
const selection = window.getSelection();

export function permuteCursor($element){
    const range = document.createRange();
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

export function onPressEnter(){
  const range = selection.getRangeAt(0);
  console.log(range.startContainer);
}

export function parseMarkdown(key, e){
  const line = selection.anchorNode.textContent;
  if(key === SPACEBAR_KEY_CODE){
    if(line.match(/^\#{6}/g)){
      const $h6 = document.createElement("h6"); // 
      $h6.textContent = DUMMY_CHARACTER;
      permuteCursor($h6);
      $h6.textContent = line.substring(6) || DUMMY_CHARACTER;
    }else if(line.match(/^\#{5}/g)){
      const $h5 = document.createElement("h5"); // 
      $h5.textContent = DUMMY_CHARACTER;
      permuteCursor($h5);
      $h5.textContent = line.substring(5) || DUMMY_CHARACTER;
    }else if(line.match(/^\#{4}/g)){
      const $h4 = document.createElement("h4"); // 
      $h4.textContent = DUMMY_CHARACTER;
      permuteCursor($h4);
      $h4.textContent = line.substring(4) || DUMMY_CHARACTER;
    }else if(line.match(/^\#{3}/g)){
      const $h3 = document.createElement("h3"); // 
      $h3.textContent = DUMMY_CHARACTER;
      permuteCursor($h3);
      $h3.textContent = line.substring(3) || DUMMY_CHARACTER;
    }else if(line.match(/^\#{2}/g)){
      const $h2 = document.createElement("h2"); // 
      $h2.textContent = DUMMY_CHARACTER;
      permuteCursor($h2);
      $h2.textContent = line.substring(2) || DUMMY_CHARACTER;
    }else if(line.match(/^\#{1}/g)){
      const $h1 = document.createElement("h1"); // 
      $h1.textContent = DUMMY_CHARACTER;
      permuteCursor($h1);
      $h1.textContent = line.substring(1) || DUMMY_CHARACTER;
    }else if(line.match(/^\>{1}/g)){
      const $blockquote = document.createElement("blockquote"); // 
      $blockquote.textContent = DUMMY_CHARACTER;
      permuteCursor($blockquote);
      $blockquote.textContent = line.substring(1) || DUMMY_CHARACTER;
    }
    return;
  }else if(key === BACKTICK_KEY_CODE){
    let isMatched = false;
    const range = selection.getRangeAt(0);
    const $parent = range.commonAncestorContainer.parentElement;

    $parent.innerHTML = $parent.innerHTML.replace(/\`.+\`$/g, match => {
      isMatched = true;
      return `<code>${match.substring(1, match.length-1)}</code>`;
    })
    if(isMatched){
      const $prevNode = range.commonAncestorContainer;
      const $text = document.createTextNode(DUMMY_CHARACTER);
      range.setStartAfter($prevNode.lastChild);
      range.setEndAfter($prevNode.lastChild);
      range.insertNode($text);
      selection.removeAllRanges();
      selection.addRange(range);
    }else{
      range.setStartAfter($parent ,selection.anchorOffset);
      range.setEndAfter($parent, selection.focusOffset);
      selection.removeAllRanges();
      selection.addRange(range);
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
    }
  }
}

