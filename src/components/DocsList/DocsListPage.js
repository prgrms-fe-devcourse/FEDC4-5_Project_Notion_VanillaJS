import DocsList from "./DocsList.js"
import DocsListHeader from "./DocsListHeader.js"
import { request } from "../../utils/api.js"
import { push } from "../../utils/router.js"

export default function DocsListPage({ $target }) {
  const onCreate = async (parentId) => {
    if (parentId !== null && typeof parent !== "number") {
      parentId = parseInt(parentId)
    }

    const newDoc = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "새 페이지",
        parent: parentId,
      }),
    })

    this.render()
    return newDoc.id
  }

  const onRemove = async (id) => {
    if (typeof id !== "number") id = parseInt(id)
    await request(`/documents/${id}`, {
      method: "DELETE",
    })

    this.render()
  }

  const $page = document.createElement("div")
  $page.classList.add("docs-list-page")

  const header = new DocsListHeader({
    $target: $page,
    initialState: {
      icon: "🤪",
      text: "맛이 가버린 노션",
    },
  })

  const docsList = new DocsList({
    $target: $page,
    initialState: [],
    onCreate,
    onRemove,
  })

  const $createButton = document.createElement("button")
  $createButton.classList.add("new-document-btn")
  $createButton.innerHTML = ' <i class="create fa-solid fa-plus"></i><p>새 페이지</p>'
  $page.appendChild($createButton)

  $createButton.addEventListener("click", async () => {
    const id = await onCreate(null)
    this.render()
    push(`/documents/${id}`)
  })

  const fetchDocs = async () => {
    const docs = await request("/documents", {
      method: "GET",
    })

    docsList.setState(docs)
  }

  this.render = async () => {
    await fetchDocs()
    $target.prepend($page)
  }

  this.render()
}
