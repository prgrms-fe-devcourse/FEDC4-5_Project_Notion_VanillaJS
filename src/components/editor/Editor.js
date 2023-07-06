export default function Editor({ 
  parent, 
  initialState,
  onEditing
}) {
  const editorElement = document.createElement('div');
  editorElement.id = 'editor-element-container';
  
  editorElement.innerHTML = `
    <div>
      <input id="editor-element-title" type="text" name="title" placeholder="제목 없음"/>
    </div>
    <div>
      <div name="content" contentEditable="true" placeholder="내용 작성"></div>
    </div>
  `

  parent.appendChild(editorElement);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    editorElement.querySelector('[name=title]').value = this.state.title;
    editorElement.querySelector('[name=content]').innerHTML = this.state.content;
  }
  this.render();

  editorElement.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value
    }

    this.setState(nextState);
    onEditing(this.state);
  })

  editorElement.querySelector('[name=content]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML
    }

    this.setState(nextState);
    onEditing(nextState);
  })
}
