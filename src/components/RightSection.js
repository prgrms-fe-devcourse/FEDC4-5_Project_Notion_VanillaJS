import { findArrayById } from "../utils/utils.js";

class RightSection {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.state = initialState;

    this.$rightSection = document.createElement("section");
    this.$rightSection.className = "right-section";
    this.$target.appendChild(this.$rightSection);

    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  template = (pathname) => {
    if (!pathname) {
      return "Home";
    }

    const theDoc = findArrayById(DUMMY_DOCUMENTS, pathname);
    return theDoc.content;
  };

  render = () => {
    this.$rightSection.innerHTML = this.template(this.state);
  };
}

export default RightSection;
