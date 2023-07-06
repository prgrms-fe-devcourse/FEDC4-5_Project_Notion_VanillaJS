import SideNavbar from "./sidebar/SideNavbar.js";

export default function App({ parent, initialState }) {
  const sideNavbar = new SideNavbar({ parent, initialState });
  
  this.route = async () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      parent.innerHTML =  '';
      sideNavbar.render();
    }
  }

  this.route();
  window.addEventListener('popstate', () => this.route());
}
