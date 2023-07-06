export default class Button {
  constructor({ parentEl, onButtonClick, text }) {
    this.parentEl = parentEl;
    this.currentEl = document.createElement("div");
    this.currentEl.classList.add("add-page");
    this.onButtonClick = onButtonClick;
    this.text = text;

    this.parentEl.appendChild(this.currentEl);
    this.render();
  }

  template(text) {
    return `
      <div class="add-page__icon"> 
        <i class='fa-solid fa-plus'></i>
      </div>
      <div class="add-page__text">${text}</div>
    `;
  }
  setState() {}

  setEvent() {
    const button = document.querySelector(".add-page");

    button.addEventListener("click", this.onButtonClick);
  }

  render() {
    this.currentEl.innerHTML = this.template(this.text);
    this.setEvent();
  }
}
