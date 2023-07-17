export default function NotFoundModal({ $target }) {
  const $notFoundModal = document.createElement('dialog');
  $notFoundModal.classList.add('not-found');

  this.state = null;

  this.showModal = (newState) => {
    this.state = newState;
    this.render();
  };

  this.closeModal = () => {
    this.state = null;
    if ($target.contains($notFoundModal)) {
      $target.removeChild($notFoundModal);
    }
  };

  this.setEvent = () => {
    $notFoundModal.addEventListener('click', () => {
      $notFoundModal.close();
    });
  };

  this.render = () => {
    const $innerModal = document.createElement('p');
    $innerModal.textContent = this.state + '를 찾을 수 없어요!';

    $notFoundModal.appendChild($innerModal);
    $target.appendChild($notFoundModal);

    $notFoundModal.showModal();
  };

  this.setEvent();
}
