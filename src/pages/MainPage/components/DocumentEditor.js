export default function DocumentEditor({ $target, onEditing }) {
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

      var node = event.target;
      var caretID = "_caret";
      var cc = document.createElement("span");
      cc.id = caretID;
      // 커서 위치 저장
      window.getSelection().getRangeAt(0).insertNode(cc);
      node.blur();

      const divList = event.target.querySelectorAll("div");
      [...divList].forEach((div) => {
        if (div.textContent.indexOf("# ") === 0) {
          div.innerHTML = `<h1>${div.textContent.substring(
            2
          )}<span id="_caret"></span></h1>`;
        } else if (div.textContent.indexOf("## ") === 0) {
          div.innerHTML = `<h2>${div.textContent.substring(
            3
          )}<span id="_caret"></span></h2>`;
        } else if (div.textContent.indexOf("### ") === 0) {
          div.innerHTML = `<h3>${div.textContent.substring(
            4
          )}<span id="_caret"></span></h3>`;
        }
      });

      this.setState({
        ...this.state,
        content: event.target.innerHTML,
      });

      var range = document.createRange();
      cc = document.getElementById(caretID);
      range.selectNode(cc);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      range.deleteContents();

      // 커서 위치 불러옴
      node.focus();
      onEditing(this.state);
    }
  });
}
