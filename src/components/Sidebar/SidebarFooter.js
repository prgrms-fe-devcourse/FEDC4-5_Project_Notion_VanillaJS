export default function SidebarFooter({ $target, onAddRootDocument }) {
  const $sidebarFooter = document.createElement("div");

  $sidebarFooter.classList.add("sidebar-footer");

  $target.appendChild($sidebarFooter);

  this.render = () => {
    $sidebarFooter.innerHTML = `<button class="sidebar-footer__button">add document</button>`;
  };

  this.render();

  $sidebarFooter.addEventListener("click", () => {
    const newDocument = {
      title: "",
      parent: null,
    };

    onAddRootDocument(newDocument);
  });
}
