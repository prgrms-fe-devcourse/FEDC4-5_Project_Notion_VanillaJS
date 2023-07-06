const changeNotSaved = ($target) => {
  $target.querySelector("#is-saved").classList.remove("saved")
  $target.querySelector("#is-saved").innerText = "저장되지 않음"
  $target.querySelector("#is-saved").classList.add("not-saved")
}

const changeSaved = ($target) => {
  $target.querySelector("#is-saved").classList.remove("not-saved")
  $target.querySelector("#is-saved").innerText = "저장됨"
  $target.querySelector("#is-saved").classList.add("saved")
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
