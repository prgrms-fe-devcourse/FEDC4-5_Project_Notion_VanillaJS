export default class Button {
  constructor({ parentEl, onButtonClick, text }) {
    this.parentEl = parentEl;
    this.currentRootEl = document.createElement("div");
    this.onButtonClick = onButtonClick;
    this.text = text;

    this.parentEl.appendChild(this.currentRootEl);

    this.render();
  }

  template(text) {
    return `
        <button>${text}</button>
    `;
  }
  setState() {}

  setEvent() {
    const button = this.currentRootEl.querySelector("button");
    button.addEventListener("click", this.onButtonClick);
  }

  render() {
    this.currentRootEl.innerHTML = this.template(this.text);
    this.setEvent();
  }
}
