export default function Button({ $target, onClick, name }) {
  const $button = document.createElement("button");
  $button.className = "add-btn";
  $target.appendChild($button);

  $button.addEventListener("click", onClick());
  this.render = () => {
    $button.innerText = "노션 추가";
  };
  this.render();
}
