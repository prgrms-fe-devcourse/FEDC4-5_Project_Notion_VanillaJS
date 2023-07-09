export default function DocumentAddBtn({
  $target,
  initalState,
  onDocumentAdd,
}) {
  const $documentAddBtn = document.createElement('button');

  this.state = initalState;

  this.setEvent = () => {
    $documentAddBtn.addEventListener('click', () => {
      onDocumentAdd();
    });
  };

  this.render = () => {
    $target.appendChild($documentAddBtn);
    $documentAddBtn.innerText = this.state;
  };
  this.setEvent();
}
