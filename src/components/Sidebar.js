import MakeDirectoryRecursively from "../utils/makeDirectoryRecursively.js";

export default function Sidebar({$target, initialState}){
  const $sidebar = document.createElement("div");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    $sidebar.innerHTML = (MakeDirectoryRecursively(this.state));
  }

  $target.appendChild($sidebar);
  this.render();
}