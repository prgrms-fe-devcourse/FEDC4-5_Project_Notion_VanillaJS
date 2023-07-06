import Component from "./Component.js";

export default class DocumentSubList extends Component {
  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { documents } = this.state;

    const subList =
      Array.isArray(documents) &&
      documents
        .map(
          ({ id, title }) => `
            <li data-id="${id}">
              <span class="title">${
                title.length > 0 ? title : "제목이 없습니다."
              }</span>
            </li>
          `
        )
        .join("");

    this.$target.innerHTML = `<ul>${subList || ""}</ul>`;
  }

  addEvent() {
    this.$target.addEventListener("click", (e) => {
      const $li = e.target.closest("li");

      if ($li) {
        this.props.onClickSubList($li.dataset.id);
      }
    });
  }
}
