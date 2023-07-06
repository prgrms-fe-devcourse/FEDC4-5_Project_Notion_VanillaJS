import SideBar from "./common/sideBar"
import NavBar from "./common/navBar"
import MainContent from "./common/mainContent"

const appTemplate = `
<div class="nav-bar"></div>
<div class="main-container">
  <div class="side-bar"></div>
  <div class="main-content">
  </div>
</div>
`

export default function App({ $target, initialState = dummyData }) {
  $target.innerHTML = appTemplate

  this.render = () => {
    new NavBar({ $target: $target.querySelector(".nav-bar"), routeApp: this.route })
    new SideBar({ $target: $target.querySelector(".side-bar"), routeApp: this.route, renderApp: this.render })
  }

  this.route = () => {
    const { pathname } = window.location
    if (pathname === "/") {
      $target.querySelector(".main-content").innerHTML = ""
    } else if (pathname.indexOf("/documents") === 0) {
      const [, , id] = pathname.split("/")
      editor.setState({ id })
    }
  }

  const editor = new MainContent({
    $target: $target.querySelector(".main-content"),
    initialState: initialState,
    renderApp: this.render,
    routeApp: this.route,
  })

  window.addEventListener("popstate", () => {
    this.route()
    this.render()
  })

  this.route()
  this.render()
}
