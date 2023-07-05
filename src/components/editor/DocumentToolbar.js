import store from "../../util/Store";

export default class DocumentToolbar {
  constructor({ $target }) {
    this.$toolbar = document.createElement("div");
    this.$toolbar.classList.add("document-toolbar");
    this.$toolbar.innerHTML = `
    <button class="action-style-btn" data-action="bold">bold</button>
    <button class="action-style-btn" data-action="underline">underline</button>
    <button class="action-style-btn" data-action="italic">italic</button>

    <button class="action-sort-btn" data-action="justifyLeft">justifyLeft</button>
    <button class="action-sort-btn" data-action="justifyCenter">justifyCenter</button>
    <button class="action-sort-btn" data-action="justifyFull">justifyFull</button>
    <button class="action-sort-btn" data-action="justifyRight">justifyRight</button>
    
    
    <button class="action-style-btn" data-action="insertOrderedList">insertOrderedList</button>
    <button class="action-style-btn" data-action="insertUnorderedList">insertUnorderedList</button>
    
    <button class="action-style-btn" data-action="insertImage">insertImage</button>
    <button class="action-style-btn" data-action="createLink">createLink</button>
    <button class="action-style-btn" data-action="removeFormat">Remove font style</button>
  `;
    // <button class="action-style-btn" data-action="h1">h1</button>
    // <button class="action-style-btn" data-action="h2">h2</button>
    // <button class="action-style-btn" data-action="h3">h3</button>
    // <button class="action-style-btn" data-action="h4">h4</button>
    // <button class="action-style-btn" data-action="h5">h5</button>
    // <button class="action-style-btn" data-action="h6">h6</button>
    this.initEvent();
    $target.appendChild(this.$toolbar);
  }

  applyStyle(action) {
    const [textStyle, parentNode] = this.getSelectedTextStyle();
    const formattedElement = document.createElement("span");
    const selectedTextContent = this.getSelectedTextContent();
    store.state.selectedStyles = action;
    console.log(parentNode);
    if (action === "bold") {
      const isBold = textStyle && textStyle.fontWeight === "700";
      formattedElement.style.fontWeight = isBold ? "normal" : "bold";
    } else if (action === "italic") {
      const isItalic = textStyle && textStyle.fontStyle === "italic";
      formattedElement.style.fontStyle = isItalic ? "normal" : "italic";
    } else if (action === "underline") {
      const isUnderline =
        textStyle && textStyle.textDecoration.includes("underline");
      formattedElement.style.textDecoration = isUnderline
        ? "none"
        : "underline"; // 부모태그로 인해 안사라짐
    } else if (action === "removeFormat") {
      formattedElement.style.fontWeight = "normal";
      formattedElement.style.fontStyle = "normal";
      formattedElement.style.textDecoration = "none";
    }
    this.wrapSelectedText(formattedElement, selectedTextContent);
  }

  applySort(action) {
    document.execCommand(action);
  }

  getSelectedTextContent() {
    const selection = document.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return range.cloneContents();
    }
    return null;
  }

  getSelectedTextStyle() {
    const selection = document.getSelection();
    const node = selection.anchorNode;
    if (node) {
      return [getComputedStyle(node.parentElement), node.parentElement];
    }
    return null;
  }

  wrapSelectedText(wrapper, content) {
    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    wrapper.appendChild(content);
    range.deleteContents();
    range.insertNode(wrapper);
    range.setStartBefore(wrapper);
    range.setEndAfter(wrapper);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  initEvent() {
    this.$toolbar.addEventListener("click", (event) => {
      const { target } = event;
      const action = target.dataset.action;

      if (target.tagName === "BUTTON") {
        switch (target.classList.value) {
          case "action-style-btn":
            this.applyStyle(action);
            break;
          case "action-sort-btn":
            this.applySort(action);
            break;
        }
      }
    });
  }
}

// case "h1":
//     case "h2":
//     case "h3":
//     case "h4":
//     case "h5":
//     case "h6":
//       this.applyHeading(action);
//       break;
// switch (action) {
//   case "bold":
//     this.applyBold();
//     break;
//   case "underline":
//     this.applyUnderline();
//     break;
//   case "removeFormat":
//     // ...생략...
//     break;

// ...생략...
// }

//   applyUnderline() {
//     const selectedTextContent = this.getSelectedTextContent();
//     const formattedElement = document.createElement("span");
//     formattedElement.style.textDecoration = "underline";
//     this.wrapSelectedText(formattedElement, selectedTextContent);
//   }

//   applyHeading(level) {
//     const selectedTextContent = this.getSelectedTextContent();
//     const headingElement = document.createElement(level);
//     store.state.selectedStyles = level;
//     this.wrapSelectedText(headingElement, selectedTextContent);
//   }
