export default function findDivParent($element){
  let $targetElement = $element;

  while($targetElement.nodeName !== "DIV"){
    $targetElement = $targetElement.parentElement;
  }

  return $targetElement;
}