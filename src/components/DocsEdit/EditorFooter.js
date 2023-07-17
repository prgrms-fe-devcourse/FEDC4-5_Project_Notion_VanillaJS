import { push } from "../../utils/router.js"

const LIST_CLASS_NAME = "sub-docs"

export default function EditorFooter({ $target, initialState }) {
  const $footer = document.createElement("footer")
  $footer.classList.add("edit-footer")
  $target.appendChild($footer)

  this.state = initialState

  this.setState = async (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (this.state.length) {
      $footer.innerHTML = `
        <div class='sub-documents-list'>
          ${this.state.map(({ id, title }) => `<p data-id="${id}" class="${LIST_CLASS_NAME}">${title}</p>`).join("")}
        </div>
      `
    } else {
      $footer.innerHTML = ``
    }
  }

  $footer.addEventListener("click", (e) => {
    const $title = e.target.closest(`.${LIST_CLASS_NAME}`)
    const { id } = $title.dataset
    push(`/documents/${id}`)
  })

  this.render()
}
