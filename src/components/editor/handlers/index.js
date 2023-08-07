const changeNotSaved = ($target) => {
  const $isSaved = $target.querySelector("#is-saved")
  $isSaved.classList.remove("saved")
  $isSaved.innerText = "저장되지 않음"
  $isSaved.classList.add("not-saved")
}

const changeSaved = ($target) => {
  const $isSaved = $target.querySelector("#is-saved")
  $isSaved.classList.remove("not-saved")
  $isSaved.innerText = "저장됨"
  $isSaved.classList.add("saved")
}

const onEditButtonOn = (editableButton, titleInput, contentTextarea) => {
  editableButton.classList.remove("clicked")
  editableButton.innerText = "수정하기"
  titleInput.readOnly = true
  contentTextarea.readOnly = true
}

const onEditButtonOff = (editableButton, titleInput, contentTextarea, $editor) => {
  editableButton.classList.add("clicked")
  editableButton.innerText = "수정완료"
  titleInput.readOnly = false
  contentTextarea.readOnly = false
  changeNotSaved($editor)
}

export { changeNotSaved, changeSaved, onEditButtonOn, onEditButtonOff }
