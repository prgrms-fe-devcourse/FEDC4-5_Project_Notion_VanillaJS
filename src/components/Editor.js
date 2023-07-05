export default function Editor({
  $target,
  initialState = { title: "", content: "" },
  onEditing,
}) {
  const $editor = document.createElement("div");

  this.state = initialState;

  $editor.innerHTML = `
    <div>
      <input type="text" name="title" style="width:300px;height:50px" display:block" value="${this.state.title}" />
    </div>
    <textarea name="content" style="width:300px; height:500px">${this.state.content}</textarea>
    `;

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.title === "Untitled") {
      $editor.querySelector("[name=title]").value = "";
      $editor.querySelector("[name=title]").placeholder = "Untitled";

      $editor.querySelector("[name=content]").value = "";
      $editor.querySelector("[name=content]").placeholder = "Edit document";
    } else {
      $editor.querySelector("[name=title]").value = this.state.title;
      $editor.querySelector("[name=content]").value = this.state.content;
    }
  };

  $editor.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");

    if (this.state[name]) {
      const nextState = {
        ...this.state,
        [name]: e.target.value,
      };

      this.setState(nextState);
      onEditing(this.state);
    }
  });

  $target.appendChild($editor);
}
