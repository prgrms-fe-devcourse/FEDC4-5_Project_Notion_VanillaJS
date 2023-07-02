export default function AddButton({ parentElement, onClick }) {
  const buttonElement = document.createElement("button");

  buttonElement.addEventListener("click", () => {
    onClick();
  });

  this.render = () => {
    parentElement.append(buttonElement);
    buttonElement.textContent = "추가 버튼";
  };
}
