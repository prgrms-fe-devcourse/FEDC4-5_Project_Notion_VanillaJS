export default class Button {
  constructor({ parentEl, onButtonClick, text }) {
    this.parentEl = parentEl;
    this.currentEl = document.createElement("div");
    this.onButtonClick = onButtonClick;
    this.text = text;

    this.parentEl.appendChild(this.currentEl);
    this.render();
  }

  template(text) {
    return `
        <button>${text}</button>
    `;
  }
  setState() {}

  setEvent() {
    const button = this.currentEl.querySelector("button");

    button.addEventListener("click", this.onButtonClick);
  }

  render() {
    this.currentEl.innerHTML = this.template(this.text);
    this.setEvent();
  }
}
