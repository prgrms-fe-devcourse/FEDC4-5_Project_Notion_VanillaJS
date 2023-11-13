import EmojiPicker from './EmojiPicker.js';

function Editor({
  $page,
  initialState = {
    id: null,
    emoji: '',
    title: '',
    content: '',
  },
  onEdit,
}) {
  const $editor = document.createElement('div');
  $page.appendChild($editor);
  $editor.classList.add('editor');

  let isInit = false;
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    for (const target of ['title', 'content', 'emoji']) {
      $editor.querySelector(`[name=${target}]`).value =
        this.state[target];
    }
    titleAreaAutoResize($editor.querySelector(`[name="title"]`));
    this.render();
  };

  this.render = () => {
    if (this.state.id === null) {
      $editor.style.visibility = 'hidden';
    } else {
      $editor.style.visibility = 'visible';
    }
    if (isInit) return;
    $editor.innerHTML = `
      <input type="emoji" name="emoji" value="${this.state.title[0]}" readonly></input>
      <textarea type="text" name="title" placeholder="제목을 입력하세요.">${this.state.title}</textarea>
      <textarea name="content" placeholder="내용을 입력하세요.">${this.state.content}</textarea>
    `;
    isInit = true;

    const $emoji = $editor.querySelector('[name="emoji"]');
    const emojiPicker = new EmojiPicker({
      $editor,
      initialState: { popup: false },
      trigger: $emoji,
      onSelectEmoji: (emoji) => {
        this.setState({ ...this.state, emoji });
        onEdit(this.state);
      },
    });
  };

  this.render();

  const titleAreaAutoResize = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  $editor.addEventListener('input', (event) => {
    const { target } = event;
    const name = target.getAttribute('name');

    this.setState({ ...this.state, [name]: target.value });
    if (name === 'title') {
      titleAreaAutoResize(target);
    }
    onEdit(this.state);
  });
}

export default Editor;
