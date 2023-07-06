import Title from './Title.js';
import Content from './Content.js';
import Breadcrumb from './Breadcrumb.js';

export default function EditorSection({ $parent, initialState, onEditing }) {
  const $editorSection = document.createElement('div');
  $editorSection.classList.add('editor-section');

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;

    title.setState({
      ...this.state,
    });

    content.setState({
      ...this.state,
    });

    breadcrumb.setState({
      ...this.state,
    });
  };

  this.init = () => {
    $parent.appendChild($editorSection);
  };

  const breadcrumb = new Breadcrumb({
    $parent: $editorSection,
    initialState: this.state,
  });

  const title = new Title({
    $parent: $editorSection,
    initialState: this.state,
    onEditing,
  });

  const content = new Content({
    $parent: $editorSection,
    initialState: this.state,
    onEditing,
  });
}
