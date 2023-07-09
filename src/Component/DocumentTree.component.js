import Component from "../core/Component.js";
import { DocumentTreeBranch } from "../domain/index.js";
import { DocumentTreeBranchComponent } from "./index.js";

export default class DocumentTreeComponent extends Component {
  render() {
    this.$target.innerHTML = `
    <div class="rootUl">
    </div>
    <button class="addRootDocumentButton addDocumentButton">+</button>
    `;

    const $rootUl = this.$target.querySelector(".rootUl");
    this.state.documentTree.forEach((doc) => {
      this.getTemplate({
        $target: $rootUl,
        doc,
      });
    });
  }

  getTemplate({ $target, doc }) {
    new DocumentTreeBranchComponent({
      $target,
      initialState: new DocumentTreeBranch(doc),
      events: [],
    });

    if (doc.documents.length > 0) {
      const $ul = document.createElement("ul");
      $target.appendChild($ul);
      doc.documents.forEach((childDoc) => {
        this.getTemplate({ $target: $ul, doc: childDoc });
      });
    }
  }
}
