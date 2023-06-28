export default function DocumentEditor({ $target, onEditing }) {
  const $editorWrapper = document.createElement('div');
  $editorWrapper.className = "docEditWrapper";
  const $title = document.createElement('div');
  $title.name = "title";
  $title.className = "docEditTitle";
  $title.contentEditable = true;
  const $content = document.createElement('div');
  $content.name = "content";
  $content.className = "docEditContent"
  $content.contentEditable = true;

  $editorWrapper.append($title, $content);
  $target.appendChild($editorWrapper);
  this.state = {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    $title.textContent = this.state.title;
    $content.textContent = this.state.content;
  }

  $editorWrapper.addEventListener('keyup', event => {
    if (event.code === 'Enter') {
      
    }
    this.setState({
      ...this.state,
      [event.target.name]: event.target.textContent,
    });
    onEditing(this.state);
  })
}