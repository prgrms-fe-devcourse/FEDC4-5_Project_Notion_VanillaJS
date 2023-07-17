import Tooltip from "./Tooltip.js";

export default function AddButton({
  parentElement,
  onClick,
  text,
  tooltipText,
}) {
  const buttonElement = document.createElement("button");
  buttonElement.className = "add-button";

  const tooltipElement = new Tooltip({ text: tooltipText });

  buttonElement.addEventListener("click", () => {
    onClick();
  });

  buttonElement.addEventListener("mouseover", (e) => {
    if (!e.target.closest(".text")) return;

    tooltipElement.toggle(e.target);
  });

  buttonElement.addEventListener("mouseout", (e) => {
    if (!e.target.closest(".text")) return;

    tooltipElement.toggle(e.target);
  });

  this.render = () => {
    parentElement.append(buttonElement);
    buttonElement.innerHTML = tooltipElement.render(
      `<div class="text">${text}</div>`
    );
  };
}
