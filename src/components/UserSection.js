import { API_HEADER_X_USERNAME } from "../constants/index.js";
import Component from "../core/Component.js";

export default class UserSection extends Component {
  render() {
    this.$target.innerHTML = `
      <span class="user">📓${API_HEADER_X_USERNAME}</span>
    `;

    const $div = document.createElement("div");
    $div.className = "fill";
    this.$parent.append($div);
  }

  addEvent() {
    this.$target.addEventListener("click", (e) => {
      if (e.target.className === "user") {
        this.props.onClickUserSection();
      }
    });
  }
}
