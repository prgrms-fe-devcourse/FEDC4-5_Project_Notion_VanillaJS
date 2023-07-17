export default class Modal {
  constructor() {
    this.$modal = document.body.querySelector('.modal');
    this.modalContent = {
      CREATE: '게시글이 추가되었습니다',
      UPDATE: '게시글이 수정되었습니다',
      DELETE: '게시글이 삭제되었습니다',
    };
    this.delay = 2000;
  }

  showModal(type) {
    this.fillModal(type);
    this.toggleModal();
    setTimeout(this.toggleModal.bind(this), this.delay);
  }

  toggleModal() {
    this.$modal.classList.toggle('open');
  }

  fillModal(type) {
    this.$modal.innerHTML = this.modalContent[type];
  }
}
