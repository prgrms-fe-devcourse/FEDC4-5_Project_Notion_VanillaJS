import store from "../../util/Store.js";
import { setItem } from "../../util/index.js";
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
      let content = event.target.innerHTML;
      const currentTime = new Date().toISOString();

      clearTimeout(timer);
      setItem(this.documentId, { content, saveTime: currentTime });
      timer = setTimeout(async () => {
        await store.documentContentPut({ id: this.documentId, content });
        // 자동으로 link 설정 코드(a 태그 클릭 안되는 이슈 발생)

        // const { documentsTree } = store.state;
        // documentsTree.forEach(({ id, title }) => {
        //   const regex = new RegExp(title);
        //   const copyContent = content;
        //   content = content.replace(
        //     regex,
        //     `<link herf="/documents/${id}">링크</link>`
        //   );
        //   if (copyContent !== content) {
        //     document.execCommand("createLink", false, "/url");
        //     // this.$editor.innerHTML = content;
        //   }
        // });
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
