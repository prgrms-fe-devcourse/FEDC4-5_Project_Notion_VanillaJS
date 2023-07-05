export default function Button({ $target, initalState, onEvent }) {
  if (!new.target) new Button({ $target, onPageAdd });

  const $button = document.createElement("button");

  $target.appendChild($button);

  this.state = initalState;

  $button.classList.add(this.state.className);

  this.render = () => {
    $button.textContent = this.state.text;
  };

  $button.addEventListener("click", (event) => onEvent(event));

  this.render();
}
