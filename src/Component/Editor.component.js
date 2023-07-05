import Component from "./Component.js";

export default class EditorComponent extends Component {
  render() {
    this.$target.innerHTML = `
      <div  >
        <div contentEditable=true name='textarea' id='textarea'>
          ${this.state.content || ""}
        </div>
        <button contentEditable=false class='saveButton'>저장</button>
      </div>
    `;
  }
}
