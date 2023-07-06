import Component from "../core/Component.js";

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
    const {onEditContent} = this.props;
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
      onEditContent({
        title : document.querySelector("[name=title]").value,
        content : document.querySelector("[name=content]").innerHTML
      })      
    })
  }
}