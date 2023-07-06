export default function Editor({
  target,
  initialState = {
    title: '',
    content: '',
  },
  onEditing,
}) {
  const editor = document.createElement('div');

  let isInit = false; // isInit 값에 따라서 innerHTML을 한번만 실행되게 하자.
  // 외부에서 편집할 수 있도록 값을 불러와서 넣을 수 도 있기 때문에 this.state 이용.
  this.state = initialState;
  target.appendChild(editor);

  this.setState = (nextState) => {
    this.state = nextState;
    editor.querySelector('[name=title]').value = this.state.title;
    editor.querySelector('[name=content]').value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInit) {
      editor.innerHTML = `
      <input type="text" name="title" style="width: 300px;" value="${this.state.title}"/>
      <textarea name="content" style="width: 300px; height: 300px;">${this.state.content}</textarea>
    `;
      isInit = true;
    }
  };

  this.render();

  // keyup: 키가 올라갔을때
  editor.addEventListener('keyup', (e) => {
    const { target } = e;

    const name = target.getAttribute('name');
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value, // key부분을 변수로 넣을 수 있다.
      };

      this.setState(nextState);
      onEditing(this.state); // this.state로 title과 content가 전달 된다.
    }
  });
}
