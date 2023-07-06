export default function SidebarHeader({ $target, initialState }) {
  const $header = document.createElement("div");

  this.state = initialState;

  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `<span>📕 ${this.state}'s notion</span>`;
  };

  this.render();
}
