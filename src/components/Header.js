import { isTitle } from "../util/prevent.js";

export default function Header({ $target, initalState }) {
  if (!new.target) new Header({ $target, initalState });

  const $header = document.createElement("h2");
  $header.classList.add("header");

  $target.appendChild($header);

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    if (!isTitle(this.state.title)) {
      $header.textContent = "Untitle";
      return;
    }
    $header.textContent = `${this.state.title}`;
  };

  this.render();
}
