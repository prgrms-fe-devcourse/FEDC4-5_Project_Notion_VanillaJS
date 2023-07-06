import Editor from "./editor.js";

export default function Content({ $target, initialState, onEditing }) {
  const $title = document.createElement("input");
  $title.name = "title";
  $title.className = "content-title";
  $target.appendChild($title);

  new Editor($target, onEditing);
  const $content = document.querySelector(".editor");

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

    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(async () => {
      if (this.state[name] !== undefined) {
        if (name === "title") {
          const nextState = {
            ...this.state,
            [name]: e.target.value,
          };
          this.setState(nextState);
        } else if (name === "content") {
          const nextState = {
            ...this.state,
            [name]: e.target.innerHTML,
          };
          this.setState(nextState);
        }
        onEditing(this.state.title, this.state.content);
      }
    }, 1000);
  });
}
