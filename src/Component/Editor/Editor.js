import INIT_DOCUMENT from '../../constants/document.js';
import EditorTemplate from '../Template/EditorTemplate.js';
import EditorChildList from './EditorChildList.js';
import EditorChildListTemplate from '../Template/EditorChildListTemplate.js';

export default function Editor({
  $target,
  initalState = INIT_DOCUMENT,
  onEditing,
}) {
  const $editor = document.createElement('div');
  $editor.className = 'editor';
  this.state = initalState;
  $target.appendChild($editor);

  let isFirstRender = false;

  this.setDependentState = ({ documents }) => {
    editorChildList.setState(EditorChildListTemplate(documents) || []);
  };

  this.setState = (nextState) => {
    const $editorTitle = $editor.querySelector('.editorTitle');
    const $editorContent = $editor.querySelector('.editorContent');

    this.state = nextState;

    const { title, content, documents } = this.state;

    if ($editorTitle) {
      $editorTitle.value = title || '';
    }

    if ($editorContent) {
      $editorContent.value = content || '';
    }

    this.setDependentState({ documents });

    this.render();
  };

  this.setEvent = () => {
    $editor.addEventListener('keyup', (e) => {
      const { target } = e;
      const name = target.getAttribute('name');

      if (name.includes('Title')) {
        this.setState({
          ...this.state,
          title: target.value,
        });
      } else if (name.includes('Content')) {
        this.setState({
          ...this.state,
          content: target.value,
        });
      }
      onEditing(this.state);
    });
  };

  this.render = () => {
    if (!isFirstRender) {
      const { title, content } = this.state;
      $editor.innerHTML = EditorTemplate(title, content || '');
      isFirstRender = true;
    }
  };

  const editorChildList = new EditorChildList({
    $target: $editor,
    initalState: [],
  });

  this.setEvent();
}
