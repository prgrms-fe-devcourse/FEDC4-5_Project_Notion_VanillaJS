export default function DocumentHeader({ $target, initialState }) {
  const $header = document.createElement('header');
  $header.classList.add('document-header');
  $target.appendChild($header);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $header.innerHTML = `
      <a href="/documents/${this.state.id}">${this.state.title}</a>
    `;
  };

  this.render();
}
