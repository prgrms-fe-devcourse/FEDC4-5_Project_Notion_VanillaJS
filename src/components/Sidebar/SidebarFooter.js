export default function SidebarFooter({ $target, onAddRootDocument }) {
  const $sidebarFooter = document.createElement("div");

  $target.appendChild($sidebarFooter);

  this.render = () => {
    $sidebarFooter.innerHTML = `<button>add document</button>`;
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
