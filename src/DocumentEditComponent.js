import Editor from './Editor.js';

export default function DocumentEditComponent({ target, initialState }) {
  const EditComponent = document.createElement('div');

  this.state = initialState;

  let timer = null;

  const editor = new Editor({
    target: EditComponent,
    initialState: this.state.doc,
    onEditing: (doc) => {
      // onEditing 기능은 아직 구현하지 못했습니다.
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        // doc : editor 에서의 title과 content
        // 편집을 하게 되면 setItem()을 이용해 local storage에
        // 'temp-doc'라는 키에 title과 content가 담긴 doc 과 tempSavekey가 들어가게 된다.
        setItem(docLocalSaveKey, {
          ...doc,
          tempSaveDate: new Date(),
        });
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    // 무한 루프 방지용
    if (this.state.id !== nextState.id) {
      this.state = nextState;
      return;
    }

    this.state = nextState;
    this.render();

    editor.setState(
      this.state.doc || {
        title: '',
        content: '',
      }
    );
  };

  this.render = async () => {
    target.appendChild(EditComponent);
  };
}
