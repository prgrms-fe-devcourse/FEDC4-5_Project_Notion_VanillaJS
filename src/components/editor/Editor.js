export default function Editor({ 
  parent, 
  initialState,
  onEditing
}) {
  const editorElement = document.createElement('div');
  editorElement.id = 'editor-element-container';

  parent.appendChild(editorElement);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {

  }

  this.render();
}
