import { API_HEADER_X_USERNAME } from "../constants/index.js";
import Component from "../core/Component.js";
import { createTarget } from "../service/index.js";

export default class UserSection extends Component {
  render() {
    this.$target.innerHTML = `
      <span class="user">📓${API_HEADER_X_USERNAME}</span>
    `;

    this.$parent.append(createTarget("div", "fill"));
  }

  addEvent() {
    this.$target.addEventListener("click", (e) => {
      if (e.target.className === "user") {
        this.props.onClickUserSection();
      }
    });
  }
}
