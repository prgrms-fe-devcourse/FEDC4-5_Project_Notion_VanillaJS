export default function DocumentListItem({ $target }) {
  const $documentListItem = document.createElement("li");
  $documentListItem.setAttribute("class", "listItem");
  $target.appendChild($documentListItem);
}
