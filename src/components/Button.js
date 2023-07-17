export default function Button({ $target, initalState, onEvent }) {
  if (!new.target) new Button({ $target, initalState, onEvent });

  const $button = document.createElement("button");

  $target.appendChild($button);

  this.state = initalState;

  this.render = () => {
    $button.textContent = this.state.text;
    $button.classList.add(this.state.className);
    $button.type = this.state.type;
  };

  $button.addEventListener("click", () => onEvent(this.state.id));

  this.render();
}
