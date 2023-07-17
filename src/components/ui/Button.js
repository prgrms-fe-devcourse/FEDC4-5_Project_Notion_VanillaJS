import validateComponent from '../../utils/validateComponent';

export default function Button({ targetElement, textContent, onClick }) {
  validateComponent(this, Button);
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.setEvent = () => {
    targetElement.addEventListener('click', onClick);
  };

  this.render = () => {
    targetElement.textContent = textContent;
  };

  this.init();
}
