export default function SideBar({ $target }) {
  const $sideBar = document.createElement("section");
  $sideBar.setAttribute("id", "directorySideBar");

  $target.appendChild($sideBar);
}
