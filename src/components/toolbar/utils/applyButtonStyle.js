import findDivParent from "./findDivParent.js";

export function applyChildElementButtonStyle(buttonType){
  const selection = document.getSelection();
  const range = selection.getRangeAt(0);
  const $extractedFrament = selection.getRangeAt(0).extractContents();
  const $newFragment = document.createDocumentFragment();

  [...$extractedFrament.childNodes].forEach(node => {
    if(node.nodeName === "#text"){
      const $newSpan = document.createElement("span");
      $newSpan.textContent = node.textContent;
      $newSpan.classList.add(buttonType);
      $newFragment.append($newSpan);
    }else{
      node.classList.toggle(buttonType);
      $newFragment.append(node);
    }
  })  
  range.insertNode($newFragment);
  range.detach();
}

export function applyChildSpanElementButtonStyle(buttonType){
  const selection = document.getSelection();
  const range = selection.getRangeAt(0);
  const $newSpan = document.createElement("span");
  const $flatFragment = document.createDocumentFragment();
  const $extractedFrament = selection.getRangeAt(0).extractContents();
  const $divParent = findDivParent(range.commonAncestorContainer);

  $newSpan.textContent = $extractedFrament.textContent;
  $newSpan.setAttribute("target");
  range.insertNode($newSpan);

  const $newSpanParent = range.commonAncestorContainer;
  $newSpan.classList = $newSpanParent.classList;
  [...$spanParent.childNodes].forEach(node => {
    if(node.nodeName === "#text" || !node.hasAttribute("target")){
      const $childSpan = document.createElement("span");
      $childSpan.classList = $spanParent.classList;
      $childSpan.textContent = node.textContent;
      $flatFragment.append($childSpan);
    }else{
      node.classList.toggle(buttonType);
      $flatFragment.append(node);
    }
  })
  $divParent.replaceChild($flatFragment, $spanParent);
  $newSpan.removeAttribute("target");
}