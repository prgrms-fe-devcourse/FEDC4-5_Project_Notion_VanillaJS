import Component from "../core/Component.js";

export default class DocumentTreeBranchComponent extends Component {
  render() {
    const $li = document.createElement("li");
    $li.id = this.state.id;
    $li.innerHTML = `
      <span class="documentLicontainer">
          <a class="documentLink" href="/documents/${this.state.id}">${this.state.title}</a>
          <span class="documentTreeButtonContainer">
            <button class="addDocumentButton" data-id="${this.state.id}">+</button>
            <button class="deleteDocumentButton" data-id="${this.state.id}">x</button>
          </span>
        </span> 
    `;
    this.$target.appendChild($li);
  }
}
