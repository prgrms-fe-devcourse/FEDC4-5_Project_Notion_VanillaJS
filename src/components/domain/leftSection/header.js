import { USERNAME } from "../../../api/core.js";

class LeftSectionHeader {
  constructor({ $target }) {
    this.$target = $target;
    this.state = USERNAME;

    this.$leftSectionHeader = document.createElement("div");
    this.$leftSectionHeader.className = "left-section-header";
    this.$target.appendChild(this.$leftSectionHeader);

    this.render();
  }

  render = () => {
    this.$leftSectionHeader.innerHTML = `
      <h2>${this.state}의 노션</h2>
      <div style="flex-grow: 1;"></div>
      <button data-option="navAddSubDomButton" class="navDom">+</button>
    `;
  };
}

export default LeftSectionHeader;
