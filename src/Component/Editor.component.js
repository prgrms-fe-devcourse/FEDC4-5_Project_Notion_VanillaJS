import Component from "./Component.js";

export default class EditorComponent extends Component {
  render() {
    this.$target.innerHTML = `
      <div class="editorContainer">
        <div class='textarea' contentEditable=true name='textarea'>
          ${this.state.content || ""}
        </div>
        <button contentEditable=false class='saveButton'>저장</button>
      </div>
    `;
  }
}
