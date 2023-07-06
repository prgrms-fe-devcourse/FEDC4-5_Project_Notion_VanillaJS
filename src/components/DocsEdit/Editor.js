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
    $editor.querySelector("[name=title]").value = this.state.title
    $editor.querySelector("[name=content]").value = this.state.content
    this.render()
  }

  let isInit = false

  this.render = () => {
    const { title, content } = this.state
    if (!isInit) {
      $editor.innerHTML = `
        <input type="text" name="title" value="${title}" placeholder="제목을 입력하세요."/>
        <textarea name="content" placeholder="내용을 입력하세요.">${content}</textarea>
      `
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
    if (e.target.tagName === "INPUT" && e.keyCode === 13) {
      const $textarea = document.querySelector("textarea[name=content]")
      $textarea.focus()
    }
  })

  this.render()
}
