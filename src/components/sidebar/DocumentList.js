export default function DocumentList({
  parent, 
  initialState,
}) {
  const documentListElement = document.createElement('div');
  const $ul = document.createElement('ul');
  documentListElement.id = 'document-list';
  
  parent.appendChild(documentListElement);
  documentListElement.appendChild($ul);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    $ul.innerHTML = '';
  }

  this.render();
}
