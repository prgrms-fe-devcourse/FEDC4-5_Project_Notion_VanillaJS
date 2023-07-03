export default class DefaultPage {
  constructor({ $target }) {
    this.$defaultPage = document.createElement("article");
    this.$defaultPage.classList.add("editor-default-section");

    $target.appendChild(this.$defaultPage);
    this.render();
  }

  render() {
    const { $defaultPage } = this;

    $defaultPage.innerHTML = `
        <div>문서를 생성 후 클릭 해주세요</div>
    `;
  }
}
