import store from "../../util/Store.js";

export default class DocumentTilte {
  constructor({ $target }) {
    this.$title = document.createElement("input");
    this.$title.setAttribute("type", "text");
    $target.appendChild(this.$title);
    this.initEvent();
    this.render();
  }
  // console.log(timer === null);
  // if (timer !== null) {
  // }

  initEvent() {
    const { $title } = this;
    let timer = null;
    const delay = 500;
    $title.addEventListener("keyup", (event) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const title = event.target.value;
        const id = $title.dataset.id;
        store.documentTitlePut({ id, title });
      }, delay);
    });
  }

  render() {
    const { pathname } = window.location;
    const { $title } = this;
    const { documentContent } = store.state;

    $title.setAttribute("data-id", pathname.substring(1));
    $title.value = documentContent.title;
  }
}
