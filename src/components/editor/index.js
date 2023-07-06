import documentAdapter from "../../api/index"

import { makeEditor, getEditorContent } from "./ui/template"
import { onEditButtonOn, onEditButtonOff } from "./handlers/index"

export default function Editor({ $target, initialState = {}, onEditing, renderApp, routeApp }) {
  this.state = initialState
  let isInitialize = false

  const $editor = makeEditor()

  this.setState = (nextState) => {
    this.state = nextState
    $editor.querySelector("input[name=title]").value = this.state.title
    $editor.querySelector("textarea[name=content]").value = this.state.content

    this.render()
  }

  this.render = () => {
    if (!isInitialize) {
      getEditorContent($editor, this.state.title, this.state.content)
      isInitialize = true
    }
  }

  const handleToggleEdit = () => {
    const editableButton = $editor.querySelector(".editable-button")
    const titleInput = $editor.querySelector("input[name=title]")
    const contentTextarea = $editor.querySelector("textarea[name=content]")

    if (editableButton.classList.contains("clicked")) {
      onEditButtonOn(editableButton, titleInput, contentTextarea)
    } else {
      onEditButtonOff(editableButton, titleInput, contentTextarea, $editor)
    }
  }

  const handleDelete = async () => {
    await documentAdapter.deleteDocument(this.state.id)
    $editor.querySelector(".doc-delete-button").style.display = "none"
    history.replaceState(null, null, "/")
    this.setState({ title: "", content: "" })
    renderApp()
    routeApp()
  }

  const handleKeyUp = async (e) => {
    const { target } = e
    const { name, value } = target

    this.setState({ ...this.state, [name]: value })

    if ($editor.querySelector(".editable-button").classList.contains("clicked")) {
      await onEditing({ title: this.state.title, content: this.state.content })
    }
  }

  $editor.addEventListener("click", (e) => {
    const { target } = e
    if (target.classList.contains("doc-delete-button")) {
      handleDelete()
    } else if (target.classList.contains("editable-button")) {
      handleToggleEdit()
    }
  })

  $editor.addEventListener("keyup", handleKeyUp)

  const replaceEditor = () => {
    const existingEditor = $target.querySelector(".editor")
    if (existingEditor) {
      $target.replaceChild($editor, existingEditor)
    } else {
      $target.appendChild($editor)
    }
  }

  this.render()
  replaceEditor()
}
