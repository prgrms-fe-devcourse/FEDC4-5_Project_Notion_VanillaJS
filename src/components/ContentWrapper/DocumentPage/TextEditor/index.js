import './style.css';

export default function TextEditor({ $target, initialState, onEditing }) {
  const $titleEditor = document.createElement('input');
  $titleEditor.className = 'TitleEditor';

  const $textEditor = document.createElement('textarea');
  $textEditor.className = 'TextEditor';

  $target.appendChild($titleEditor);
  $target.appendChild($textEditor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    // console.log(this.state);
    this.render();
  };

  this.render = () => {
    const { title, content, res, status } = this.state;
    if (!status && res) {
      $titleEditor.value = res.title;
      $textEditor.value = res.content;
    } else {
      $titleEditor.value = title;
      $textEditor.value = content;
    }
  };

  const onKeyUp = () => {
    const { id } = this.state.res;
    onEditing(id, { title: $titleEditor.value ? $titleEditor.value : '제목 없음', content: $textEditor.value });
  };

  $titleEditor.addEventListener('keyup', onKeyUp);
  $textEditor.addEventListener('keyup', onKeyUp);
}
