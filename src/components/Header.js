export default function Header({ $target, initalState }) {
  if (!new.target) new Header({ $target, initalState });

  const $header = document.createElement("h2");
  $header.classList.add("header");

  $target.appendChild($header);

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.title.length < 0) {
      $header.textContent = "Untitle";
      return;
    }
    $header.textContent = `${this.state.title}`;
  };

  this.render();
}
