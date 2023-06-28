import { Component } from "../core/Component";

export default class Document extends Component {
  render() {
    this.el.innerHTML = `
        <div class="container">
            <p>Doc 1</p>
            <p>Doc 2</p>
            <p>Doc 3</p>
        </div>
        `;
    this.el.setAttribute("id", "document-app");
    this.el.setAttribute("style", "background-color: rgb(251,251,250)");
  }
}
