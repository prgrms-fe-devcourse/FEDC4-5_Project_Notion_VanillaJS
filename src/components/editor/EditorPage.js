export default class EditorPage {
  constructor({ $target }) {
    this.$editorPage = document.createElement("section");
    this.$editorPage.classList.add("editor-section");

    $target.appendChild(this.$editorPage);
    this.render();
  }

  render() {
    const { $editorPage } = this;
  }
}
