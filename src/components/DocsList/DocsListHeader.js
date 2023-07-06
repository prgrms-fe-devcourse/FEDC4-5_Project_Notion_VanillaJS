import { push } from "../../utils/router.js"

export default function DocsListHeader({ $target, initialState }) {
  const $header = document.createElement("div")
  $header.classList.add("list-header")
  $target.appendChild($header)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $header.innerHTML = `
      <p>${this.state.icon} ${this.state.text}</p>
    `
  }

  this.render()

  $header.addEventListener("click", (e) => {
    push(`/`)
  })
}
