import Component from "./Component.js";
import DocumentTreeBranch from "../domain/DocumentTreeBranch.js";
import DocumentTreeBranchComponent from "./DocumentTreeBranch.component.js";

export default class DocumentTreeComponent extends Component {
  render() {
    this.$target.innerHTML = `
    <ul className="rootUl">
    ${this.state.documentTree.map((doc) => this.getTemplate(doc)).join("")}
    </ul>
    <button class="addRootDocumentButton addDocumentButton">+</button>
    `;
  }

  getTemplate(documentTree) {
    return documentTree.documents.map((childDoc) => {
      console.log(childDoc);
      new DocumentTreeBranchComponent({
        $target: this.$target,
        initialState: new DocumentTreeBranch(childDoc),
        events: [],
      });
    });
  }
}
