import DocumentList from "./DocumentList.js";
import DocumentAddBtn from "./DocumnetAddBtn.js";
import store from "../../util/Store.js";

export default class SidebarPage {
  constructor({ $target }) {
    this.$sidebarPage = document.createElement("setion");
    this.$sidebarPage.classList.add("sidebar-setion");
    $target.appendChild(this.$sidebarPage);
    this.render();
  }

  render() {
    const { $sidebarPage } = this;

    new DocumentList({
      $target: $sidebarPage,
    });

    new DocumentAddBtn({
      $target: $sidebarPage,
    });
  }
}
