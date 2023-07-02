export default function PostEditor({ target, initialState, onEdit }) {
  const editorElement = document.createElement('form');

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    target.appendChild(editorElement);
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

        onEdit(nextState.id, {
          title: nextState.title,
          content: nextState.content,
        });
      }
    });

    const { title, content } = this.state;

    editorElement.querySelector('.post-title').value = title;
    editorElement.querySelector('.post-content').value = content;
    console.log(editorElement.querySelector('.post-title').value);
  };

  // this.render();
}
