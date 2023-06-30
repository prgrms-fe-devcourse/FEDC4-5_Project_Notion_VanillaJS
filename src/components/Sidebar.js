import MakeDirectoryRecursively from "../utils/makeDirectoryRecursively.js";

export default function Sidebar({$target, initialState, onClickDocument , onClickAdd, onClickDelete}){
  const $sidebar = document.createElement("div");
  $target.appendChild($sidebar);

  this.state = initialState;
  let currentId = null;

  this.setState = (nextState) => {
    this.state = nextState;
    if(!this.state.selectedId || currentId !== this.state.selectedId){
      this.render();
      currentId = this.state.selectedId;
    }
  }
  
  this.render = () => {
    console.log("render");
    $sidebar.innerHTML = `<button class="add-root">+</button>` + MakeDirectoryRecursively(this.state.documents, +this.state.selectedId);
  }

  $sidebar.addEventListener("click", async (e) => {
    const $li = e.target.closest("li");
    const {className} = e.target;

    if(className === "add-root"){
      onClickAdd(null);
      return;
    }

    if($li){
      const {id} = $li.dataset;
      if(className === "add-document"){
        onClickAdd(id);
      }else if(className === "delete-document"){
        await onClickDelete(id);
        this.render();
      }else{
        onClickDocument(id);
      }
    }
  })
}