let isOpen = true;

export function openSideBar() {
  isOpen = true;
}

export function closeSideBar() {
  isOpen = false;
}

export function getSideBarState() {
  return isOpen;
}
