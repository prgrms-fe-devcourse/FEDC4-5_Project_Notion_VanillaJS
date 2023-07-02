import DocumentInput from "./DocumentInput.js";
export default class DocumentAddBtn {
  constructor({ $target, onSubmit }) {
    this.$target = $target;
    this.$button = document.createElement("form");
    this.onSubmit = onSubmit;
    $target.appendChild(this.$button);
    this.initEvent();
    this.render();
  }

  initEvent() {
    this.$button.addEventListener("click", (event) => {
      event.preventDefault();
      new DocumentInput({
        $target: this.$target.querySelector(".document-list"),
        onSubmit: this.onSubmit,
      });
    });
  }

  render() {
    this.$button.innerHTML = `
        <button> 문서 추가 하기 </button>
      `;
  }
}
