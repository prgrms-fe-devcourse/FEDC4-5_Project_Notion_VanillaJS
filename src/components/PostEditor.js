export default function PostEditor({ target, initialState, onEdit }) {
  const editorElement = document.createElement('form');
  target.appendChild(editorElement);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  let init = false;

  this.render = () => {
    if (!init) {
      editorElement.innerHTML = `
        <input type='text' name='title' class='post-title'/>
        <textarea name='content' class='post-content'></textarea>
    `;

      editorElement.addEventListener('keyup', e => {
        const { target } = e;

        const name = target.getAttribute('name');

        if (this.state[name] !== undefined) {
          const nextState = {
            ...this.state,
            [name]: target.value, // key - value
          };

          this.setState(nextState);

          onEdit(this.state.id, {
            title: this.state.title,
            content: this.state.content,
          });
        }
      });
      init = true;
    }

    const { title, content } = this.state;

    editorElement.querySelector('.post-title').value = title;
    editorElement.querySelector('.post-content').value = content;
  };

  this.render();
}
