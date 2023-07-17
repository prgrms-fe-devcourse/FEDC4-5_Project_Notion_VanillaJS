const INPUT_TAGNAME = "INPUT"
const ENTER_KEY = "Enter"

export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEdit,
}) {
  const $editor = document.createElement("div")
  $editor.classList.add("editor")
  $target.appendChild($editor)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  let isInit = false
  const $titleInput = document.createElement("input")
  const $contentTextarea = document.createElement("textarea")

  this.render = () => {
    const { title, content } = this.state
    if (isInit) {
      $editor.querySelector("[name=title]").value = this.state.title
      $editor.querySelector("[name=content]").value = this.state.content
    } else {
      $titleInput.type = "text"
      $titleInput.name = "title"
      $titleInput.placeholder = "제목을 입력하세요."
      $titleInput.value = title

      $contentTextarea.name = "content"
      $contentTextarea.placeholder = "내용을 입력하세요."
      $contentTextarea.value = content

      $editor.appendChild($titleInput)
      $editor.appendChild($contentTextarea)

      isInit = true
    }
  }

  $editor.addEventListener("keyup", (e) => {
    const { target } = e
    const name = target.getAttribute("name")

    // JS는 빈 문자열도 false로 처리하기 때문에 undefined로 체크
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      }

      this.setState(nextState)
      onEdit(this.state)
    }
  })

  $editor.addEventListener("keyup", (e) => {
    if (e.target.tagName === INPUT_TAGNAME && e.key === ENTER_KEY) {
      $contentTextarea.focus()
    }
  })

  this.render()
}
