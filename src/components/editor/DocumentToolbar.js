import store from "../../util/Store";
import {
  boldImg,
  underlineImg,
  italicImg,
  justifyLeftImg,
  justifyCenterImg,
  justifyRightImg,
  insertOrderedListImg,
  insertUnorderedListImg,
  strikeThroughImg,
  broomImg,
} from "../../../public/index.js";

export default class DocumentToolbar {
  constructor({ $target }) {
    this.$toolbar = document.createElement("div");
    this.$toolbar.classList.add("document-toolbar");

    this.$toolbar.innerHTML = `
    <button class="action-style-btn" data-action="bold">
      <img src=${boldImg} class="icon"></img>
    </button>
    <button class="action-style-btn" data-action="italic">
      <img src=${italicImg} class="icon"></img>
    </button>
    <button class="action-style-btn" data-action="strikeThrough">
      <img src=${strikeThroughImg} class="icon"></img>
    </button>
    <button class="action-style-btn" data-action="underline">
      <img src=${underlineImg} class="icon"></img>
    </button>
    <button class="action-sort-btn" data-action="justifyLeft">
      <img src=${justifyLeftImg} class="icon"></img>
    </button>
    <button class="action-sort-btn" data-action="justifyCenter">
      <img src=${justifyCenterImg} class="icon"></img>
    </button>
    <button class="action-sort-btn" data-action="justifyRight">
      <img src=${justifyRightImg} class="icon"></img>
    </button>
    
    <button class="action-style-btn" data-action="insertOrderedList">
      <img src=${insertOrderedListImg} class="icon"></img>
    </button>
    <button class="action-style-btn" data-action="insertUnorderedList">
      <img src=${insertUnorderedListImg} class="icon"></img>
    </button>
    
    <button class="action-style-btn" data-action="insertImage">iI</button>
    <button class="action-style-btn" data-action="createLink">cL</button>
    <button class="action-style-btn" data-action="removeFormat">
      <img src=${broomImg} class="icon"></img>
    </button>
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
    const textStyle = this.getSelectedTextStyle();
    const formattedElement = document.createElement("span");
    const selectedTextContent = this.getSelectedTextContent();
    store.state.selectedStyles = action;

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
        : "underline";
    } else if (action === "removeFormat") {
      formattedElement.style.fontWeight = "normal";
      formattedElement.style.fontStyle = "normal";
      formattedElement.style.textDecoration = "none";
    } else if (action === "strikeThrough") {
      const isStrikeThrough =
        textStyle && textStyle.textDecoration.includes("line-through");
      formattedElement.style.textDecoration = isStrikeThrough
        ? "none"
        : "line-through";
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
      return getComputedStyle(node.parentElement);
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
