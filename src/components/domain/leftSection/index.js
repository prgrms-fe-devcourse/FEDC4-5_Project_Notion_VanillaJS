import LeftSectionHeader from "./header.js";
import LeftSectionList from "./list.js";

class LeftSection {
  constructor({ $target, initialState, ...handlers }) {
    this.$target = $target;
    this.state = initialState;

    this.$leftSection = document.createElement("div");
    this.$leftSection.className = "left-section";
    this.$target.appendChild(this.$leftSection);

    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  render = () => {
    this.$leftSection.innerHTML = "";

    new LeftSectionHeader({ $target: this.$leftSection });
    new LeftSectionList({
      $target: this.$leftSection,
      initialState: this.state,
    });
  };
}

export default LeftSection;
