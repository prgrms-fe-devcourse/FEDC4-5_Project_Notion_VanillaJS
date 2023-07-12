import { DUMMY_CHARACTER } from "../../../constants/constants.js";

export default function onPressInCodeBlock(e){
  const selection = document.getSelection();
  const $currentParent = selection.anchorNode.parentElement;
  const $current = selection.anchorNode;
  if($currentParent.classList.contains("code-block") && 
  selection.anchorOffset === $current.length){
    e.preventDefault();
    const range = selection.getRangeAt(0);
    const $dummy = document.createTextNode(DUMMY_CHARACTER);
    range.setStartAfter($currentParent);
    range.setEndAfter($currentParent);
    range.insertNode($dummy);
    range.setStart($dummy, 0);
    range.setEnd($dummy, 1);
    selection.removeAllRanges();
    selection.addRange(range);
    range.detach();
  }
}