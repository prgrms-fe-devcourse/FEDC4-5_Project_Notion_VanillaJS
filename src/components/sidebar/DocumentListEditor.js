import { request } from "../../util/api.js";
import DocumentInput from "./DocumentInput.js";
export default class DocumentListEditor {
  constructor({ $target, onSubmit }) {
    this.$editor = document.createElement("span");
    this.$target = $target;
    this.onSubmit = onSubmit;
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
          onSubmit: this.onSubmit,
          parent: this.$target.id,
        });
      } else if (action === "delete") {
        //따로 빼자
        await request(`/documents/${this.$target.id}`, {
          method: "DELETE",
        });
        //
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
