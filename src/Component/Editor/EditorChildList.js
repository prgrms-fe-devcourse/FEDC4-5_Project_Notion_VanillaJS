export default function EditorChildList ({ $target, initalState }) {
  const $editorDocumentChild = document.createElement('ul')

  this.state = initalState
  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $target.appendChild($editorDocumentChild)
    $editorDocumentChild.innerHTML = this.state
  }
}
