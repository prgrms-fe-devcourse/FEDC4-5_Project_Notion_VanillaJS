import { request } from "../../utils/api.js"
import Editor from "./Editor.js"
import EditorFooter from "./EditorFooter.js"

export default function EditPage({ $target, initialState, onEdit }) {
  const $page = document.createElement("div")
  $page.className = "edit-page"

  this.state = initialState

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: "",
      content: "",
    },
    onEdit,
  })

  const editorFooter = new EditorFooter({
    $target: $page,
    initialState: [],
  })

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      const newDoc = await fetchDocument(nextState.id)
      this.state = newDoc
    }

    editor.setState(
      this.state || {
        title: "",
        content: "",
      },
    )

    editorFooter.setState(this.state.documents)
    this.render()
  }

  this.render = () => {
    $target.appendChild($page)
  }

  const fetchDocument = async (id) => {
    if (id !== "new") {
      return await request(`/documents/${id}`, { method: "GET" })
    }
  }
}
