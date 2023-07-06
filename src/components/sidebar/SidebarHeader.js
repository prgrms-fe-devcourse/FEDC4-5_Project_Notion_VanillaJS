export default function SidebarHeader({ parent, closeSideNavbar, openSideNavbar }) {
  const sidebarHeader = document.createElement('div');
  sidebarHeader.id = 'sidebar-header';

  parent.appendChild(sidebarHeader);
  
  this.render = () => {
    sidebarHeader.innerHTML = ``
  }

  this.render();
}
