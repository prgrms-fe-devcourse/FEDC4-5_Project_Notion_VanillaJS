import { makeModal, getModalContent } from "./template"

export default function Modal({ props, ConstructorComponent }) {
  const $modal = makeModal()

  this.onClose = () => {
    $modal.remove()
    document.querySelector("#modal").classList.remove("open")
    document.removeEventListener("click", handleOutsideClick, true)
  }

  const handleOutsideClick = (e) => {
    if (!e.target.closest("#modal")) {
      this.onClose()
    }
  }

  this.render = () => {
    getModalContent($modal)

    const $modalContent = $modal.querySelector(".modal-content")
    new ConstructorComponent({ $target: $modalContent, ...props })

    const $modalCloseButton = $modal.querySelector(".modal-close")
    $modalCloseButton.addEventListener("click", this.onClose)

    const $modalContainer = document.querySelector("#modal")
    $modalContainer.innerHTML = ""
    $modalContainer.appendChild($modal)
    $modalContainer.classList.add("open")

    document.addEventListener("click", handleOutsideClick, true)
  }

  this.render()
}
