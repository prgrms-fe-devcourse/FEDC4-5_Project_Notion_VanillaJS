export default function SideBarFooter({ $target }) {
  const $addDocumentButton = document.createElement("button");

  $target.appendChild($addDocumentButton);

  this.render = () => {
    $addDocumentButton.textContent = "add document";
  };

  this.render();
}
