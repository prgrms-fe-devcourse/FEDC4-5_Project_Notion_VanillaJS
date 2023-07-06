export default function EditorPreview({ $target, initalState }) {
  const $editorPreview = document.createElement('div');
  $editorPreview.classList.add('editorPreview');

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.appendChild($editorPreview);
    $editorPreview.innerHTML = this.state;
  };
}
