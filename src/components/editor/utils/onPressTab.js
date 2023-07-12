export default function onPressTab(){
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
  range.detach();
  return;
}