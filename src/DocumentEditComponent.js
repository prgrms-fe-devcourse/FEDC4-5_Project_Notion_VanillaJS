import Editor from './Editor.js';
import { putDocument } from './api.js';
import { update } from './router.js';

export default function DocumentEditComponent({ target, initialState }) {
  const EditComponent = document.createElement('div');

  this.state = initialState;
  let timer = null;

  const editor = new Editor({
    target: EditComponent,
    initialState: {
      title: '',
      content: '',
    },
    onEditing: async (doc) => {
      await putDocument(doc);
      update();
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
