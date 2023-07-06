import store from "../../util/Store";

export default class SubfolderView {
  constructor({ $target }) {
    this.$SubfolderView = document.createElement("div");
    this.$SubfolderView.classList.add("subfolder-view");
    $target.appendChild(this.$SubfolderView);
    this.render();
  }

  render() {
    const { documents } = store.state.documentContent;
    if (Array.isArray(documents)) {
      if (documents.length > 0) {
        const htmlString = `<div>하위 폴더 목록</div>${documents
          .map(({ id, title }) => {
            return `<div><a href="/documents/${id}">${title}</a></div>`;
          })
          .join("")}`;
        this.$SubfolderView.innerHTML = htmlString;
      }
    }
  }
}
