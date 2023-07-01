import { push } from "../service/index.js";

export default class DocumentList {
  constructor({ $parent, initialState }) {
    this.$target = document.createElement("div");
    this.$target.className = "documentList";
    $parent.append(this.$target);

    this.state = initialState;

    this.render();

    this.$target.addEventListener("click", (e) => {
      const $li = e.target.closest("li");

      if ($li) {
        const { id } = $li.dataset;

        push(`/documents/${id}`);
      }
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const list = (document) => {
      return (
        Array.isArray(document) &&
        `<ul>${document
          .map(
            (item) => `
          <li data-id="${item.id}">
            ${item.title}
            ${item.documents.length > 0 ? list(item.documents) : ""}
          </li>`
          )
          .join("")}
        </ul>`
      );
    };

    this.$target.innerHTML = list(this.state);
  }
}
