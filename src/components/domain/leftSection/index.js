import LeftSectionHeader from "./header.js";
import LeftSectionList from "./list.js";

class LeftSection {
  constructor({
    $target,
    initialState,
    loadPageById,
    addNavSubDom,
    deleteNavDom,
  }) {
    this.$target = $target;
    this.state = initialState;
    this.loadPageById = loadPageById;
    this.addNavSubDom = addNavSubDom;
    this.deleteNavDom = deleteNavDom;
    this.NavFocusBox = null;

    this.$leftSection = document.createElement("div");
    this.$leftSection.className = "left-section";
    this.$target.appendChild(this.$leftSection);

    this.addEvent();
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

  addEvent = () => {
    this.$leftSection.addEventListener("click", ({ target }) => {
      const { dataset } = target;
      const $navDocument = target.closest(".navDom");
      const clickNavDocument = $navDocument !== null;

      if (clickNavDocument) {
        const buttonOption = dataset.option;
        const targetId = $navDocument.dataset.id;

        if (!!buttonOption) {
          switch (buttonOption) {
            case "hideNavTabButton":
              target.classList.toggle("hideSubNav");
              target.parentNode.nextElementSibling.classList.toggle("hide");
              break;

            case "navAddSubDomButton":
              this.addNavSubDom($navDocument);
              break;

            case "navDeleteDomButton":
              this.deleteNavDom(targetId);
              break;
          }
        } else {
          // 글 클릭하면
          this.pageLoadToId(targetId);
        }
      }
    });
  };

  setNavFocusBox = ($nextNavFocusBox) => {
    if (!!this.NavFocusBox) this.NavFocusBox.classList.remove("focusNav");
    this.NavFocusBox = $nextNavFocusBox;
    this.NavFocusBox.classList.add("focusNav");
  };

  findDOMById = (id) => {
    const domList = document.querySelectorAll(".navDom");
    for (const dom of domList) if (dom.dataset.id == id) return dom;
  };
}

export default LeftSection;
