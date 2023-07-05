import { push } from "./router.js";

export default function LinkButton({ $target, initialState }) {
  const $linkButton = document.createElement("div");
  this.state = initialState;

  $target.appendChild($linkButton);
  this.render = () => {
    $linkButton.innerHTML = `${this.state.text}`;
  };

  //this.render();

  $linkButton.addEventListener("click", () => {
    push(this.state.link);
  });
}
