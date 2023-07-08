import { push } from "../../utils/router.js"
import { escapeHTML } from "../../utils/escapeHTML.js"

export default function DocsList({ $target, initialState, onCreate, onRemove }) {
  const $docsList = document.createElement("div")
  $docsList.classList.add("docs-list")
  $target.appendChild($docsList)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.getDocuments = async () => {
    const docs = await request("/documents", {
      method: "GET",
    })
    this.setState(docs)
  }

  const renderDocuments = (documents) => {
    return documents
      .map((doc) => {
        const hasChildDocuments = doc.documents && doc.documents.length > 0
        const childDocuments = hasChildDocuments ? renderDocuments(doc.documents) : ""
        const documentTitle = escapeHTML(doc.title)

        return `
        <li data-id="${doc.id}" class="document-item">
          <div class="document-item-container">
            <div class="document-title-container">
              <i class="fa-regular fa-file-lines"></i>
              <p class="document-title">${documentTitle}</p>
            </div>
            <button class="create" type="button">
              <i class="create fa-solid fa-plus"></i>
            </button>
            <button class="remove" type="button">
              <i class="remove fa-regular fa-trash-can"></i>
            </button>
          </div>
          ${hasChildDocuments ? `<ul class="documents-list">${childDocuments}</ul>` : ""}
        </li>
      `
      })
      .join("")
  }

  this.render = () => {
    $docsList.innerHTML = `
      <ul>
        ${renderDocuments(this.state)}
      </ul>
    `
  }

  this.render()

  $docsList.addEventListener("click", async (e) => {
    const $li = e.target.closest(".document-item")

    if ($li) {
      const { id } = $li.dataset
      const { classList, tagName } = e.target

      if (classList.contains("create")) {
        const newDocId = await onCreate(id)
        push(`/documents/${newDocId}`)
      } else if (classList.contains("remove")) {
        if (confirm("페이지를 삭제하시겠습니까?")) {
          await onRemove(id)
          push(`/`)
        }
      } else if (tagName === 'P') {
        const [, , urlDocumentId] = window.location.pathname.split("/")
        if (urlDocumentId !== id) push(`/documents/${id}`)
      }
    }
  })
}
