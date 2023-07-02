import store from "../../util/Store.js";
export default class DocumentInput {
  constructor({ $target, targetId }) {
    this.targetId = targetId;
    this.$inputContainer = document.querySelector(".input-container");

    if (this.$inputContainer) {
      this.hide();
    }

    this.$inputContainer = document.createElement("ul");
    this.$inputContainer.classList.add("input-container");
    $target.insertAdjacentElement("afterend", this.$inputContainer);
    this.initEvent();
    this.render();
  }

  initEvent() {
    const { $inputContainer, targetId } = this;

    $inputContainer.addEventListener("submit", async (event) => {
      event.preventDefault();

      const inputElement = event.target.querySelector("input[type='text']");
      const { value } = inputElement;

      store.documentProduce({ title: value, parent: targetId });
      this.hide();
    });
  }

  render() {
    this.$inputContainer.innerHTML = `
      <form>
        <input type="text"/>
        <button>생성</button>
      <form>
    `;
    this.$inputContainer.querySelector("input[type='text']").focus();
  }

  hide() {
    this.$inputContainer.remove();
  }
}
