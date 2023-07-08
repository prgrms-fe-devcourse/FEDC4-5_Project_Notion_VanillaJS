import Component from "../core/Component.js";

export default class EditorComponent extends Component {
  render() {
    this.$target.innerHTML = `
    <div class="editorContainer">
      <div class="title" ${
        this.state.id === -1
          ? `contentEditable="false"`
          : `contentEditable="true"`
      } name="title">
        ${this.state.title || "제목을 입력하세요"}
      </div>
      <div class="textarea" ${
        this.state.id === -1
          ? `contentEditable="false"`
          : `contentEditable="true"`
      } name="textarea">
        ${this.state.content || ""}
      </div>
    </div>
    `;
  }
}
