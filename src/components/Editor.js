export default function Editor({$target, initialState, onEditing}){
  const $editor = document.createElement("div");

  this.state = initialState;
  
  $editor.style.height = "600px";
  $editor.style.width = "400px";
  $target.appendChild($editor);
  
  $editor.innerHTML = `
  <input type="text" name="title" style="width:600px;" autofocus>
  <textarea name="content" style="width:600px; height:400px;"></textarea>
  `
  
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }
  
  this.render = () => {
    const $title = $editor.querySelector("[name=title]");
    const $content = $editor.querySelector("[name=content]");
    if(!this.state){
      $title.style.visibility = "hidden";
      $content.style.visibility = "hidden";
    }else{
      $title.style.visibility = "";
      $content.style.visibility = "";
      $title.value = this.state.title;
      $content.value = this.state.content;
    }
  }

  this.render();

  $editor.querySelector("[name=title]").addEventListener("input", async (e) => {
    const nextState = {
      ...this.state,
      title : e.target.value
    };
    this.setState(nextState);
    await onEditing(this.state, this.state.id,e.target);
  })

  $editor.querySelector("[name=content]").addEventListener("input", async (e) => {
    const nextState = {
      ...this.state,
      content : e.target.value
    };
    this.setState(nextState);
    await onEditing(this.state, this.state.id ,e.target);
  })
}