export default class DocumentInput {
  constructor({ $target, sendCreateFolderRequest, parent }) {
    this.parent = parent;
    this.sendCreateFolderRequest = sendCreateFolderRequest;
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
    const { $inputContainer, parent, sendCreateFolderRequest } = this;

    $inputContainer.addEventListener("submit", async (event) => {
      event.preventDefault();

      const inputElement = event.target.querySelector("input[type='text']");
      const { value } = inputElement;

      sendCreateFolderRequest({ title: value, parent });
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
