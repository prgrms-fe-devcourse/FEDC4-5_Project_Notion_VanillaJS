import Editor from "./Editor.js";

export default function Content({ $target, initialState, onEditing }) {
  const $title = document.createElement("input");
  $title.name = "title";
  $title.className = "content-title";
  $target.appendChild($title);

  new Editor($target, onEditing);
  const $content = document.getElementsByClassName("editor")[0];

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $title.value = this.state.title;
    $content.innerHTML = this.state.content;
  };
  this.render();

  let timer = null;

  const updateState = async (name, e) => {
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: name === "title" ? e.target.value : e.target.innerHTML,
      };
      this.setState(nextState);
      onEditing(this.state.title, this.state.content);
    }
  };

  $target.addEventListener("keyup", (e) => {
    const name = e.target.name;
    if (name === "title") {
      const { pathname } = window.location;
      const [, , id] = pathname.split("/");
      const divElement = document.querySelector(`div[data-id="${id}"]`);

      for (let i = 0; i < divElement.children.length; i++) {
        if (divElement.children[i].tagName === "SPAN") {
          divElement.children[i].textContent = e.target.value;
          break;
        }
      }
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      updateState(name, e);
    }, 1000);
  });
}
