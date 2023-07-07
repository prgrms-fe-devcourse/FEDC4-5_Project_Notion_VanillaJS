export default function DocumentAddBtn ({
  $target,
  initalState,
  onDocumentAdd
}) {
  const $documentAddBtn = document.createElement('button')

  this.state = initalState

  this.render = () => {
    $target.appendChild($documentAddBtn)
    $documentAddBtn.innerText = this.state
  }

  $documentAddBtn.addEventListener('click', () => {
    onDocumentAdd()
  })
}
