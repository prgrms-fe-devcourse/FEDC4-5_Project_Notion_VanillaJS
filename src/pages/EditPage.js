import EditorSection from '../components/Editor/EditorSection.js';

export default function EditPage({ $parent, initialState, onEditing }) {
  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    editorSection.setState(this.state);
  };

  this.init = () => {
    editorSection.init();
  };

  const editorSection = new EditorSection({
    $parent,
    initialState: this.state,
    onEditing,
  });
}
