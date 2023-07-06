export default function Content({ $parent, initialState, onEditing }) {
  const $content = document.createElement('div');
  $content.classList.add('editor-content');
  $parent.appendChild($content);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    $content.querySelector('[name=content]').value = this.state.content;
  };

  this.render = () => {
    $content.innerHTML = `
    <textarea name="content" placeholder="내용 없음">${this.state.content}</textarea>
`;
  };

  this.render();
  $content.addEventListener('input', onEditing);
}
