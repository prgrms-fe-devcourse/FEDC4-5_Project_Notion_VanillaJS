import storage from "../../utils/storage"
import { userName } from "../../config/apiConfig"

export default function NavBar({ $target, routeApp }) {
  const onClickTitle = () => {
    history.pushState(null, null, "/")
    routeApp()
  }

  const navTemplate = (userName) => {
    return `
        <div class='title'>NoNotion</div>
        <div class='currentUser'>
        ${userName}님 환영합니다.
        </div>
        `
  }

  this.render = () => {
    $target.innerHTML = navTemplate(storage.getItem("currentUser") ?? userName)
    $target.querySelector(".title").addEventListener("click", onClickTitle)
  }

  this.render()
}
