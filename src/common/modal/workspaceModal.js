import documentAdapter from "../../api/index"
import storage from "../../utils/storage"
import validateUserName from "../../function/validateUserName"
import { userName } from "../../config/apiConfig"

export default function WorkSpaceModal({ $target, renderApp, routeApp }) {
  const onClickWorkSpace = (data) => {
    storage.setItem("currentUser", data)
    documentAdapter.updateCurrentUser()
  }

  this.state = storage.getItem("userName")
    ? storage.getItem("userName")
    : JSON.parse(storage.setItem("userName", JSON.stringify([{ label: "기본", name: userName }])))

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  const $list = document.createElement("ul")
  $list.className = "workspace-list"
  const $alert = document.createElement("div")
  $alert.className = "workspace-alert"

  const $form = document.createElement("form")
  $form.addEventListener("submit", (e) => {
    e.preventDefault()
    const userName = $input.value.trim()
    if (validateUserName(userName)) {
      this.setState([...this.state, { label: userName, name: userName }])
      storage.setItem("userName", JSON.stringify(this.state))
      $input.value = ""
    } else {
      $alert.innerText = "유저 이름은 1~10자의 영문자와 \n 숫자로 이루어져야 합니다."
      setTimeout(() => {
        $alert.innerText = ""
      }, 3000)
    }
  })

  const $input = document.createElement("input")
  $input.className = "workspace-input"

  const $button = document.createElement("button")
  $button.innerText = "추가"
  $button.className = "workspace-button"

  this.render = () => {
    $target.innerHTML = ""
    console.log(this.state)
    $list.innerHTML = `${this.state
      .map((user) => {
        return `<li class="workspace-item" data-name="${user?.name}
      ">${user?.label}</li>`
      })
      .join("")}`

    $target.appendChild($list)
    $form.appendChild($input)
    $form.appendChild($button)
    $target.appendChild($form)
    $target.appendChild($alert)

    $list.querySelectorAll(".workspace-item").forEach(($item) => {
      $item.addEventListener("click", () => {
        onClickWorkSpace($item.dataset.name)
        history.replaceState(null, null, "/")
        renderApp()
        routeApp()
      })
    })
  }

  this.render()
}
