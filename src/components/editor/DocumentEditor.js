import store from "../../util/Store";
import { setItem } from "../../util/storage";
export default class DocumentEditor {
  constructor({ $target }) {
    this.$editor = document.createElement("div");
    this.$editor.setAttribute("id", "documentContent");
    this.$editor.setAttribute("contenteditable", "true");
    $target.appendChild(this.$editor);

    const { pathname } = window.location;
    this.documentId = pathname.split("/")[2];

    this.initEvent();
    this.render();
  }

  applyStyles() {
    const style = store.state.selectedStyles;
    document.execCommand(style);
    store.state.selectedStyles = "";
  }

  initEvent() {
    let timer = null;
    let delay = 1000;
    this.$editor.addEventListener("input", (event) => {
      const content = event.target.innerHTML;
      const currentTime = new Date().toISOString();

      clearTimeout(timer);
      setItem(this.documentId, { content, saveTime: currentTime });
      timer = setTimeout(async () => {
        await store.documentContentPut({ id: this.documentId, content });
      }, delay);
    });

    this.$editor.addEventListener("keydown", (event) => {
      this.applyStyles();
    });
  }

  render() {
    this.$editor.focus();

    const content = store.state.documentContent.content ?? "";
    this.$editor.innerHTML = content;
  }
}

// store.state.documentContent.content;

// const content = this.$editor.innerHTML;
// this.$editor.innerHTML = this.parseMarkdown(content);

// this.$editor.addEventListener("keydown", (event) => {
//   if (event.key === "Enter") {
//     event.preventDefault(); // 기본 동작 방지

//     const selection = document.getSelection();
//     const range = selection.getRangeAt(0);
//     const br = document.createElement("br");

//     range.deleteContents();
//     range.insertNode(br);
//     range.setStartAfter(br);
//     range.collapse(true);
//     selection.removeAllRanges();
//     selection.addRange(range);
//   }
// });

//   parseMarkdown = (text) => {
//     const rules = [
//       [
//         /(\#{1,6})\s?(.+)/,
//         ([h = [], text]) => `<h${h.length}>${text}</h${h.length}>`,
//       ],
//       [/\*\*(.+?)\*\*/, "<strong>$1</strong>"],
//       [/\*(.+?)\*/, "<em>$1</em>"],
//       [/\[(.+)\]\((.+)\)/, '<a href="$2">$1</a>'],
//       [/^1\.\s(.+)/, "<ol><li>$1</li></ol>"],
//       [/^-\s(.+)/, "<ul><li>$1</li></ul>"],
//     ];
//     let html = text;
//     rules.forEach(([rule, replacement]) => {
//       html = html.replace(
//         rule,
//         typeof replacement === "function"
//           ? replacement((rule.exec(html) ?? []).slice(1))
//           : replacement
//       );
//     });
//     return html;
//   };
