import Component from "../core/Component";

export default class Editor extends Component {
  render() {
    this.el.innerHTML = `
        <div class="container">
          <input class="titleInput"/>
          <textarea class="contentInput" placeholder="Input Something..."></textarea>
        </div>
        `;
    this.el.setAttribute("id", "editor-app");
  }
}
