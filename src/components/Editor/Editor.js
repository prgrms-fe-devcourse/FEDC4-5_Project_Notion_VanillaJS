export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('form');
  $editor.className = 'editor';
  $target.appendChild($editor);

  const $title = document.createElement('input');
  $title.className = 'title';
  $title.name = 'title';

  const $content = document.createElement('textarea');
  $content.className = 'content';
  $content.name = 'content';

  let isInitialize = false;

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $editor.addEventListener('keyup', (e) => {
    const name = e.target.getAttribute('name');
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: e.target.value,
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  });

  this.render = () => {
    if (!isInitialize) {
      $editor.append($title, $content);
      isInitialize = true;
    }
    $title.value = this.state.title;
    $content.value = this.state.content;
  };
  this.render();
}
