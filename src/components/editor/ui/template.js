const makeEditor = () => {
  const $editor = document.createElement("div")
  $editor.className = "editor"

  return $editor
}

const getEditorContent = ($editor, title, content) => {
  $editor.innerHTML = `
    <div class='doc-nav'>
      <input type="text" class='doc-title' name="title" value="${title ?? ""}" readOnly />
      <div class='title-right-container'>
      <span id='is-saved'></span>
      <button class='editable-button'>수정하기</button>
      <button class='doc-delete-button'>삭제</button>
      </div>
    </div>
    <textarea name="content" style="width:100%; flex:1;" readOnly>${content ?? ""}</textarea>
`
}

export { makeEditor, getEditorContent }
