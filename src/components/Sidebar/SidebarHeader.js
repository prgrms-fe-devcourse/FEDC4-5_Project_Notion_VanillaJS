export default function SidebarHeader({ $target, initialState }) {
  const $header = document.createElement("h1");

  this.state = initialState;

  $target.appendChild($header);

  this.render = () => {
    $header.textContent = `${initialState}'s Notion`;
  };

  this.render();
}
