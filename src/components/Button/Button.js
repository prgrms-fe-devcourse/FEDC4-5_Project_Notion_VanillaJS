export default function Button({ $parent, className, text, onClick }) {
  const $button = document.createElement('div');
  $button.style.cursor = 'pointer';
  $parent.appendChild($button);

  if (className) {
    $button.classList.add(className);
  }
  this.render = () => {
    $button.innerHTML = `
        <div>${text}</div>
        `;
  };

  this.render();

  $button.addEventListener('click', onClick);
}
