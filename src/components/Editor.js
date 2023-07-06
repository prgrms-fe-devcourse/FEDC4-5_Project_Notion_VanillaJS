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
    const name = e.target.getAttribute("name");

    if (this.state[name]) {
      const nextState = {
        ...this.state,
        [name]: e.target.value,
      };

      this.setState(nextState);

      console.log("넘겨준 doc: ", this.state);

      //doc this.state:
      //{id: 89730, title: 'ㅇ', createdAt: '2023-07-06T13:11:47.726Z', updatedAt: '2023-07-06T13:11:47.782Z', content: '', …}
      //근데 content에서 변화 생길 땐 변화가 안 일어남...

      onEditing(this.state);
    }
  });

  $target.appendChild($editor);
}
