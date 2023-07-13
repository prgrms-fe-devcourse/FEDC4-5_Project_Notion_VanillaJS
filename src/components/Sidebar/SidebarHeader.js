export default function SidebarHeader({ $target, initialState }) {
  const $header = document.createElement('header');
  $header.classList.add('sidebar-header');
  $target.appendChild($header);

  this.state = initialState;

  this.render = () => {
    $header.innerHTML = `
      <a href="/">${this.state.heading}</a>
    `;
  };

  this.render();
}
