const makeModal = () => {
  const $modal = document.createElement("div")
  $modal.className = "modal"
  return $modal
}

const getModalContent = ($modal) => {
  $modal.innerHTML = `<div class="modal-inner">
    <button class="modal-close">X</button>
    <div class="modal-content"></div>
</div>`
}

export { makeModal, getModalContent }
