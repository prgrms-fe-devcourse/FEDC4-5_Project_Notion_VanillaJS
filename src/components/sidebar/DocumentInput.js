import store from "../../util/Store.js";
import plusImg from "../../../public/plusImg.svg";
export default class DocumentInput {
  constructor({ $target, targetId }) {
    this.targetId = targetId;
    this.$inputContainer = document.querySelector(".input-container");

    if (this.$inputContainer) {
      this.hide();
    }

    this.$inputContainer = document.createElement("form");
    this.$inputContainer.classList.add("input-container");
    $target.insertAdjacentElement("beforeend", this.$inputContainer);
    this.initEvent();
    this.render();
  }

  initEvent() {
    const { $inputContainer, targetId } = this;

    $inputContainer.addEventListener("submit", async (event) => {
      event.preventDefault();

      const inputElement = event.target.querySelector("input[type='text']");
      const { value } = inputElement;

      const newId = await store.documentProduce({
        title: value,
        parent: targetId,
      });
      history.pushState(null, null, `/documents/${newId}`);
      store.documentGet(newId);
      store.documentsGet();
    });
  }

  render() {
    this.$inputContainer.innerHTML = `
        <input type="text"/>
        <button>+</button>
    `;
    this.$inputContainer.querySelector("input[type='text']").focus();
  }

  hide() {
    this.$inputContainer.remove();
  }
}
