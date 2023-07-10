import { push } from "../utils/router.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");

  $editor.innerHTML = `
  <div class="editor-container">
    <input class="title" type="text" placeholder="제목 없음" name="title"/>
    <div class="editor" name="content" contentEditable="true"></div>
    <div class="navigator"></div>
  </div>
  `;

  $target.appendChild($editor);

  this.state = initialState;

  const placeholderText = "내용을 입력하세요.";

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    $editor.className = this.state.isEditor ? "block" : "none";
  };

  this.render = () => {
    let richContent = "";
    if (this.state.content) {
      richContent = this.state.content.replace(/<div>/g, "<br>").replace(/<\/div>/g, "");
    }

    let htmlText = richContent
      .split("<br>")
      .map((line) => {
        if (line.indexOf("# ") === 0) {
          return `<h1>${line.substr(2)}</h1>`;
        } else if (line.indexOf("## ") === 0) {
          return `<h2>${line.substr(3)}</h2>`;
        } else if (line.indexOf("### ") === 0) {
          return `<h3>${line.substr(4)}</h3>`;
        } else if (line.indexOf("- ") === 0) {
          return `<li>${line.substr(2)}</li>`;
        } else {
          if (this.state.titleList) {
            for (const titleItem of this.state.titleList) {
              console.log(titleItem);
              if (line.indexOf(titleItem.title) !== -1) {
                const replacedLine = line.replace(
                  titleItem.title,
                  `<a class="link" data-id=${titleItem.id}>${titleItem.title}</a>`
                );
                return replacedLine;
              }
            }
          }
        }
        return line;
      })
      .join("<br>");

    if (this.state.childTitleList) {
      let navigatorText = "";
      for (const titleItem of this.state.childTitleList) {
        if (titleItem) {
          navigatorText += `<span class="link-container"><img src="/assets/file-link.svg" class="file-link-img" alt="File Image"/><a class="link" data-id=${
            titleItem.id
          }>${titleItem.title ? titleItem.title : "제목 없음"}</a></span><br>`;
        }
      }

      const $navigator = document.querySelector(".navigator");
      if ($navigator) {
        $navigator.innerHTML = navigatorText;
      }
    }

    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = htmlText;

    const $contentInput = $editor.querySelector("[name=content]");

    $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
      const nextState = { ...this.state, title: e.target.value };
      this.setState(nextState);
      onEditing(this.state);
    });

    $editor.querySelector("[name=content]").addEventListener("input", (e) => {
      const nextState = {
        ...this.state,
        content: e.target.innerHTML,
      };
      this.setState(nextState);
      onEditing(this.state);
    });

    if (this.state.content) {
      $editor.addEventListener("click", (e) => {
        const $a = e.target.closest("a");
        if ($a) {
          const { id } = $a.dataset;
          push(`/documents/${id}`);
        }
      });
    }

    $contentInput.addEventListener("blur", (e) => {
      if (!$contentInput.innerHTML.trim()) {
        $contentInput.innerHTML = placeholderText;
      }
    });

    $contentInput.addEventListener("focus", (e) => {
      if ($contentInput.innerHTML.trim() === placeholderText) {
        $contentInput.innerHTML = "";
      }
    });

    const moveCursorToEnd = (element) => {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    };
    moveCursorToEnd($contentInput);
  };

  this.render();
}
