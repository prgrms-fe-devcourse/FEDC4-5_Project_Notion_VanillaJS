export default function Button({ $target, onClick = () => {}, text = "버튼", className = "" }) {
  const $button = document.createElement("button")

  this.render = () => {
    $button.className = className
    $button.innerText = text
    $button.addEventListener("click", onClick)

    $target.appendChild($button)
  }

  this.render()
}
