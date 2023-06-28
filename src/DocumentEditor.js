export default function DocumentEditor({ $target, initialState, onEditing }) {
  const $editorWrapper = document.createElement('div');
  const $title = document.createElement('input');
  $title.name = "title";
  $title.className = "docTitleEditInput";
  const $content = document.createElement('textarea');
  $content.name = "content";
  $content.className = "docContentEditArea"

  $editorWrapper.append($title, $content);
  $target.appendChild($editorWrapper);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    $title.value = this.state.title;
    $content.value = this.state.content;
  }

  $editorWrapper.addEventListener('keyup', event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
    onEditing(this.state);
  })
}