import EmojiPicker from "/src/component/EmojiPicker.js";

function Editor({
  $page,
  initialState = {
    id: null,
    emoji: "",
    title: "",
    content: "",
  },
  onEdit,
}) {
  const $editor = document.createElement("div");
  $page.appendChild($editor);
  $editor.classList.add("editor");

  let isInit = false;
  this.state = initialState;
  this.setState = nextState => {
    this.state = nextState;
    for (const target of ["title", "content"]) {
      $editor.querySelector(`[name=${target}]`).value =
        this.state[target];
    }
    $editor.querySelector('[name="title"]').value =
      this.state.title;
    $editor.querySelector('[name="content"]').value =
      this.state.content;
    $editor.querySelector('[name="emoji"]').value =
      this.state.emoji;
    this.render();
  };

  this.render = () => {
    if (this.state.id === null) {
      $editor.style.visibility = "hidden";
    } else {
      $editor.style.visibility = "visible";
    }
    if (isInit) return;
    $editor.innerHTML = `
      <input type="emoji" name="emoji" value="${this.state.title[0]}" readonly></input>
      <input type="text" name="title" value="${this.state.title}" placeholder="제목을 입력하세요.">
      <textarea name="content" placeholder="내용을 입력하세요.">${this.state.content}</textarea>
    `;
    isInit = true;

    const $emoji = $editor.querySelector('[name="emoji"]');
    const emojiPicker = new EmojiPicker({
      $editor,
      initialState: { popup: false },
      trigger: $emoji,
      onSelectEmoji: emoji => {
        this.setState({ ...this.state, emoji });
        onEdit(this.state);
      },
    });
  };

  this.render();

  $editor.addEventListener("keyup", event => {
    const { target } = event;
    const name = target.getAttribute("name");
    if (this.state[name] === undefined) return;
    this.setState({
      ...this.state,
      [name]: target.value,
    });
    onEdit(this.state);
  });
}

export default Editor;
