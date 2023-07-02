import DocumentInput from "./DocumentInput.js";
export default class DocumentAddBtn {
  constructor({ $target, sendCreateFolderRequest }) {
    this.$target = $target;
    this.$button = document.createElement("form");
    this.sendCreateFolderRequest = sendCreateFolderRequest;
    $target.appendChild(this.$button);
    this.initEvent();
    this.render();
  }

  initEvent() {
    this.$button.addEventListener("click", (event) => {
      event.preventDefault();
      new DocumentInput({
        $target: this.$target.querySelector(".document-list"),
      });
    });
  }

  render() {
    this.$button.innerHTML = `
        <button> 문서 추가 하기 </button>
      `;
  }
}
