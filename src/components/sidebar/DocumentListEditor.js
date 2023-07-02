import { request } from "../../util/api.js";
import DocumentInput from "./DocumentInput.js";
export default class DocumentListEditor {
  constructor({ $target, sendCreateFolderRequest, sendDeleteFolderRequest }) {
    this.$editor = document.createElement("span");
    this.$target = $target;
    this.sendCreateFolderRequest = sendCreateFolderRequest;
    this.sendDeleteFolderRequest = sendDeleteFolderRequest;
    $target.appendChild(this.$editor);

    this.initEvent();
    this.render();
  }

  initEvent() {
    this.$editor.addEventListener("click", async (event) => {
      event.preventDefault();
      const action = event.target.dataset.action;
      if (action === "produce") {
        new DocumentInput({
          $target: this.$target.nextElementSibling,
          sendCreateFolderRequest: this.sendCreateFolderRequest,
          parent: this.$target.id,
        });
      } else if (action === "delete") {
        this.sendDeleteFolderRequest(this.$target.id);
      }
    });
  }

  render() {
    this.$editor.innerHTML = `
        <button data-action="produce">생성</button>
        <form style="display: inline-block">
          <button data-action="delete">삭제</button>
        </form>
    `;
  }

  hide() {
    this.$editor.style.display = "none";
  }

  show() {
    this.$editor.style.display = "inline-block";
  }
}
