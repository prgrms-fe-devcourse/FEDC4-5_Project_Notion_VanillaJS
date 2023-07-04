export default function SideBarFooter({ $target, onAddRootDocumnet }) {
  const $addDocumentButton = document.createElement("button");

  $target.appendChild($addDocumentButton);

  this.render = () => {
    $addDocumentButton.textContent = "add document";
  };

  this.render();

  $addDocumentButton.addEventListener("click", async () => {
    const newDocument = {
      title: "제목 없음",
      parent: null,
    };

    onAddRootDocumnet(newDocument);
  });
}
