import { push } from "../../../services/router.js";

export default function DocumentEditor({ $target, onEditing, isDocument }) {
  const $editorWrapper = document.createElement("div");
  $editorWrapper.className = "docEditWrapper";

  const $title = document.createElement("div");
  $title.className = "docEditTitle";
  $title.contentEditable = true;

  const $content = document.createElement("div");
  $content.className = "docEditContent";
  $content.contentEditable = true;

  $editorWrapper.append($title, $content);
  $target.appendChild($editorWrapper);

  this.state = {};

  this.setState = (nextState) => {
    if (nextState.content === null) nextState.content = "<div><br></div>";
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $title.textContent = this.state.title;
    $content.innerHTML = this.state.content;
  };

  $title.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      $content.focus();
    }
  });

  $title.addEventListener("input", (event) => {
    this.setState({
      ...this.state,
      title: event.target.textContent,
    });

    onEditing(this.state);
  });

  $content.addEventListener("input", (event) => {
    onEditing({
      ...this.state,
      content: event.target.innerHTML,
    });
  });

  $content.addEventListener("keyup", (event) => {
    if (event.code === "Backspace" && event.target.textContent === "") {
      event.target.innerHTML = "<div><br></div>";
    }

    if (event.code === "Enter") {
      event.preventDefault();

      const $node = event.target;
      const caretID = "_caret";
      const $cc = document.createElement("span");
      $cc.id = caretID;
      $node.blur();

      const divList = event.target.querySelectorAll("div");
      [...divList].forEach((div) => {
        if (div.textContent.indexOf("# ") === 0) {
          div.innerHTML = `<h1>${div.textContent.substring(2)}</h1>`;
        } else if (div.textContent.indexOf("## ") === 0) {
          div.innerHTML = `<h2>${div.textContent.substring(3)}</h2>`;
        } else if (div.textContent.indexOf("### ") === 0) {
          div.innerHTML = `<h3>${div.textContent.substring(4)}</h3>`;
        } else if (div.textContent.indexOf("/ ") === 0) {
          const doc = isDocument(div.textContent.substring(2));
          if (doc) {
            div.innerHTML = `<div data-id=${doc.id} class="linkToDoc">${doc.title}</div>`;
          }
        }
      });

      this.setState({
        ...this.state,
        content: event.target.innerHTML,
      });

      const range = document.createRange();
      $node.appendChild($cc);
      range.selectNode($cc);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      range.deleteContents();

      // 커서 위치 불러옴
      $node.focus();
      onEditing(this.state);
    }
  });

  $content.addEventListener('click', (event) => {
    if (event.target.className === 'linkToDoc'){
      push(`/documents/${event.target.dataset.id}`);
    }
  })
}
