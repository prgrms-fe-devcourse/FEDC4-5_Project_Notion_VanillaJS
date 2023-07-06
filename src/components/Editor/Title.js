export default function Title({ $parent, initialState, onEditing }) {
  const $title = document.createElement('div');
  $title.classList.add('editor-title');

  $parent.appendChild($title);
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    $title.querySelector('[name=title]').value = this.state.title;
  };

  this.render = () => {
    $title.innerHTML = `
        <input name="title" placeholder="제목없음"></input>
  `;
  };

  this.render();

  $title.querySelector('[name=title]').addEventListener('keyup', onEditing);
}
