export default function AddButton({ parentElement, onClick, text }) {
  const buttonElement = document.createElement("button");

  buttonElement.addEventListener("click", () => {
    onClick();
  });

  this.render = () => {
    parentElement.append(buttonElement);
    buttonElement.textContent = text;
  };
}
