import Component from "./Component.js";

export default class EditorComponent extends Component {
  render() {
    this.$target.innerHTML = `
    <div class="editorContainer">
      <div class='title' name='title'>
        ${this.state.title || "제목을 입력하세요"}
      </div>
      <div class='textarea' contentEditable=true name='textarea'>
        ${this.state.content || ""}
      </div>
    </div>
    `;
  }
}
