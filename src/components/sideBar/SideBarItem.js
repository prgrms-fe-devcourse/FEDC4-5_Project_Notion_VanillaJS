export default function SideBarItem({ $target, text, onClick }) {
  const $sideBarItem = document.createElement("div");
  $sideBarItem.setAttribute("class", "listItem");
  $target.appendChild($sideBarItem);

  $sideBarItem.textContent = text;
  $sideBarItem.addEventListener("click", () => onClick());
}
