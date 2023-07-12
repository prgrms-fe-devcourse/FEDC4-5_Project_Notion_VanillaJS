import Component from "../core/Component.js";
export default class EditorComponent extends Component {
  render() {
    this.$target.innerHTML = `
    <div class="editorContainer">
      <div class="title" maxLength="20"${
        this.state.id === -1
          ? `contentEditable="false"`
          : `contentEditable="true"`
      }>
        ${this.state.title}
      </div>
      <div class="textarea" ${
        this.state.id === -1
          ? `contentEditable="false"`
          : `contentEditable="true"`
      }>
        ${this.state.content || ""}
      </div>
    </div>
    `;
  }
}
