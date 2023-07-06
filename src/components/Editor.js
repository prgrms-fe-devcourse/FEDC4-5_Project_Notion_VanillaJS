export default function Editor({
  $target,
  initialState = { title: "", content: "" },
  onEditing,
}) {
  const $editor = document.createElement("div");

  this.state = initialState;

  $editor.innerHTML = `
    <input type="text" name="title" style="width:95%;height:50px; display:block" value="${this.state.title}" />
    <textarea name="content" style="width:95%; height:600px">${this.state.content}</textarea>
    `;

  this.setState = (nextState) => {
    this.state = nextState;

    if (
      (this.state.title === "Untitled" || this.state.title === "") &&
      this.state.content === ""
    ) {
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
    //console.log("에디터 편집 시 발생 이벤트: ", e);
    const name = e.target.getAttribute("name");

    console.log("this.state[name]: ", this.state[name]);
    console.log("this.state: ", this.state);

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
