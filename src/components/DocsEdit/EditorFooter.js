import { push } from "../../utils/router.js"

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
    if (this.state.length > 0) {
      $footer.innerHTML = `
        <div class='sub-documents-list'>
          ${this.state.map(({ id, title }) => `<p data-id="${id}" class="sub-docs">${title}</p>`).join("")}
        </div>
      `
    } else {
      $footer.innerHTML = ``
    }
  }

  $footer.addEventListener("click", (e) => {
    const $title = e.target.closest(".sub-docs")
    const { id } = $title.dataset
    push(`/documents/${id}`)
  })

  this.render()
}
