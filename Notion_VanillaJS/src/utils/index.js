export function debounceSaveLocal(callback) {
  const delay = 1000;
  let timer;

  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback(...arguments);
    }, delay);
  };
}

export function debounceSaveServer(callback) {
  const delay = 3000;
  let timer;

  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback(...arguments);
    }, delay);
  };
}

export function showModal(type) {
  const delay = 2000;

  const $modal = document.body.querySelector('.modal');
  fillModal(type, $modal);
  toggleModal($modal);
  setTimeout(() => {
    toggleModal($modal);
  }, delay);
}

function toggleModal($modal) {
  $modal.classList.toggle('open');
}

function fillModal(type, $modal) {
  const modalContent = {
    CREATE: '게시글이 추가되었습니다',
    UPDATE: '게시글이 수정되었습니다',
    DELETE: '게시글이 삭제되었습니다',
  };
  const $contentContainer = $modal.querySelector('.modal-content');
  $contentContainer.innerHTML = modalContent[type];
}
