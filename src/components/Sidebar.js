import MakeDirectoryRecursively from "../utils/makeDirectoryRecursively.js";
import { push } from "../utils/router.js";

export default function Sidebar({$target, initialState, onClickAdd}){
  const $sidebar = document.createElement("div");
  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }
  
  this.render = () => {
    $sidebar.innerHTML = `<button class="add-root">+</button>` +MakeDirectoryRecursively(this.state);
  }
  
  $sidebar.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const {className} = e.target;

    if(className === "add-root"){
      onClickAdd("root");
      return;
    }
    if($li){
      const {id} = $li.dataset;
      if(className === "add-document"){
        onClickAdd(id);
      }else{
        push(`/documents/${id}`);
      }
    }
  })
  
  this.render();
}