class Editor {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.state = initialState;

    this.$editor = document.createElement("div");
    this.$target.appendChild(this.$editor);

    if (this.state) {
      this.render();
    }
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  render = () => {
    this.$editor.innerHTML = `
      <input type="text" name="title" style="width:600px;" value="${
        this.state.title || ""
      }"/>
      <textarea name="content" style="width:600px;height:400px;">${
        this.state.content || ""
      }</textarea>
    `;
  };
}

export default Editor;
