export default class DocumentInput {
  constructor({ $target, onSubmit, parent }) {
    this.parent = parent;
    this.onSubmit = onSubmit;
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
    const { $inputContainer, parent, onSubmit } = this;

    $inputContainer.addEventListener("submit", async (event) => {
      event.preventDefault();

      const inputElement = event.target.querySelector("input[type='text']");
      const { value } = inputElement;

      onSubmit({ title: value, parent });
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
  }

  hide() {
    this.$inputContainer.remove();
  }
}
