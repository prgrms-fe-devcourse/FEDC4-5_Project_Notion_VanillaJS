export default function Editor({$target, initialState = {
  title : "",
  content : ""
}, onEditing}){
  const $editor = document.createElement("div");

  this.state = initialState;

  $editor.style.height = "600px";
  $editor.style.width = "400px";
  $target.appendChild($editor);

  $editor.innerHTML = `
    <input type="text" name="title" style="width:600px;">
    <textarea name="content" style="width:600px; height:400px;"></textarea>
  `

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
  }

  this.render();

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      title : e.target.value
    };
    this.setState(nextState);
    onEditing(this.state);
  })

  $editor.querySelector("[name=content]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      content : e.target.value
    };
    this.setState(nextState);
    onEditing(this.state);
  })
}