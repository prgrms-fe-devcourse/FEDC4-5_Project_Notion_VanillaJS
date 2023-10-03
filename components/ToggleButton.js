export default function ToggleButton({ $target, onClickButton }) {
  const $toggleBtn = document.createElement("button");
  $toggleBtn.className = "toggle-btn2";
  $toggleBtn.innerHTML = `<i class="fa fa-solid fa-arrow-right fa-rotate-180" style="color: #000000;"></i>`;

  $target.appendChild($toggleBtn);

  $toggleBtn.addEventListener("click", () => {
    onClickButton();
  });
}
