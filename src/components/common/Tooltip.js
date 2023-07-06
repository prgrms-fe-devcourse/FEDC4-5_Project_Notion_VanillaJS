export default function Tooltip({ text }) {
  this.toggle = (targetElement) => {
    targetElement.nextElementSibling.classList.toggle("toggle");
  };

  this.render = (content) => {
    return `
    <div class="tooltip">
      ${content}
      <div class="tooltip-text">${text}</div>
    </div>
    `;
  };
}
