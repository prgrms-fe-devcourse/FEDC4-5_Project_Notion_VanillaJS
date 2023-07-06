import DocumentChildListTemplate from '../Template/DocumentChildListTemplate.js';

export default function DocumentChildList({ $target, initalState }) {
  const $documentChildContainer = document.createElement('div');

  this.state = initalState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentChildContainer.replaceChildren(
      DocumentChildListTemplate(this.state)
    );
    $target.appendChild($documentChildContainer);
  };
}
