export default function SideBarItem({ $target, text, onClick }) {
  const $sideBarItem = document.createElement("li");
  $target.appendChild($sideBarItem);

  $sideBarItem.innerHTML = `
    <span>${text}</span>
  `;
  $sideBarItem.addEventListener("click", () => onClick());
}
