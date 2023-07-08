import Component from "./Component.js";

export default class DocumentTreeBranchComponent extends Component {
  render() {
    $target.innerHTML = `
    <li id="${this.state.id}">
      <span class="documentLicontainer">
          <a class="documentLink" href="/documents/${this.state.id}">${this.state.title}</a>
          <span class="documentTreeButtonContainer">
            <button class="addDocumentButton" data-id="${this.state.id}">+</button>
            <button class="deleteDocumentButton" data-id="${this.state.id}">x</button>
          </span>
        </span>
    </li>    
    `;
  }
}
