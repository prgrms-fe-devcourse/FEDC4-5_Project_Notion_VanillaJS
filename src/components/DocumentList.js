import Component from "../core/Component.js";

export default class DocumentList extends Component {
  render() {
    const { pathname } = location;
    const [, , documnetId] = pathname.split("/");

    const list = (state, depth = 0) => {
      return (
        Array.isArray(state) &&
        `<ul>${state
          .map(
            ({ id, isOpen, title, documents }) => `
          <li data-id="${id}">
            <div class="document" style="--depth: ${depth}">
              <div class="documentTitle">
                <button class="toggle ${isOpen ? "open" : ""}">&gt</button>
                <span>📄</span>
                <span class="title ${
                  documnetId === String(id) ? "current" : ""
                }" style="--depth: ${depth}">
                ${title.length > 0 ? title : "제목이 없습니다."}
                </span>
              </div>
              <div class="createDelete">
                <button class="create">+</button>
                <button class="delete">-</button>
              </div>
            </div>
            ${
              Array.isArray(documents) && documents.length > 0 && isOpen
                ? list(documents, depth + 1)
                : ""
            }
          </li>`
          )
          .join("")}
        </ul>`
      );
    };

    this.$target.innerHTML = `
      <div class="topSpace">
        <span>documents</span>
        <button class="createRoot">+</button>
      </div>
      ${list(this.state) || ""}
    `;
  }

  addEvent() {
    const {
      onClickDocumentTitle,
      onCreateDocument,
      onDeleteDocument,
      onToggleDocument,
    } = this.props;

    this.$target.addEventListener("click", (e) => {
      const { target } = e;
      const $li = target.closest("li");
      const { className, classList } = target;

      if ($li) {
        const { id } = $li.dataset;

        if (classList.contains("title")) {
          onClickDocumentTitle(id);
        }

        if (className === "create") {
          onCreateDocument(id);
        }

        if (className === "delete") {
          onDeleteDocument(id);
        }

        if (classList.contains("toggle")) {
          onToggleDocument(id);
        }
      } else {
        if (className === "createRoot") {
          onCreateDocument(null);
        }
      }
    });
  }
}
