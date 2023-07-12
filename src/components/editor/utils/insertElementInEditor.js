export default function insertElementInEditor($element){
  const selection = window.getSelection();
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