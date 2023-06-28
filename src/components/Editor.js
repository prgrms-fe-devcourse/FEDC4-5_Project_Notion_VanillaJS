import { Component } from "../core/Component";

export default class Editor extends Component {
  render() {
    this.el.innerHTML = `
        <div class="container">
          <p>Editor View</p>
        </div>
        `;
    this.el.setAttribute("id", "editor-app");
  }
}
