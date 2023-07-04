import Component from "../core/Component.js";

export default class Toolbar extends Component{
  template(){
    return `
      <button class="bold">Bold</button>
      <button class="italic">Italic</button>
      <button class="underline">Underline</button>
      <button class="line-through">Line Through</button>
      <button class="code-block">Code Block</button>
    `;
  }

  setEvent(){
    const selection = document.getSelection();
    this.addEvent("click", "button", ({target}) => {
      const {classList : buttonType} = target;
      const range = selection.getRangeAt(0);
      const $extractedFrament = (selection.getRangeAt(0).extractContents());
      const $newFragment = document.createDocumentFragment();
      const $parent = range.commonAncestorContainer.parentElement;
      let $divParent = (range.commonAncestorContainer);
      while($divParent.nodeName !== "DIV"){
        $divParent = $divParent.parentElement;
      }

      if($parent.nodeName === "DIV"){
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
      }else if($parent.nodeName === "SPAN"){
        const $span = document.createElement("span");
        const $flatFragment = document.createDocumentFragment();
        $span.textContent = $extractedFrament.textContent;
        $span.setAttribute("target", true);
        range.insertNode($span);
        const $spanParent = range.commonAncestorContainer;
        $span.classList = $spanParent.classList;
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
        $span.removeAttribute("target");
      }
    })
  }
}