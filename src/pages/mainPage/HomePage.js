import { validateComponent } from '../../utils/validation';

const HOME_MESSAGE = {
  TITLE: '노션 클로닝 프로젝트',
  ADD_PAGE: '페이지 추가 버튼으로 새 글을 작성해 보세요.',
  ADD_BUTTON: '➕로 글을 추가하거나',
  DELETE_BUTTON: '➖로 글을 삭제할 수 있어요.',
  BACK_TO_HOME: '유저명을 누르면 홈으로 돌아올 수 있어요!',
};

export default function HomePage({ $target }) {
  validateComponent(new.target);

  const $homePage = document.createElement('div');
  $homePage.classList.add('home-page');

  this.render = () => {
    $target.appendChild($homePage);
    $homePage.innerHTML = `
    <h1 class="home-title">📝${HOME_MESSAGE.TITLE}</h1>
    <ul class="home-list">
      <li class="home-list__text">✅${HOME_MESSAGE.ADD_PAGE}</li><br>
      <li class="home-list__text">✅${HOME_MESSAGE.ADD_BUTTON} ${HOME_MESSAGE.DELETE_BUTTON}</li><br>
      <li class="home-list__text">✅${HOME_MESSAGE.BACK_TO_HOME}</li>
    </ul>
    `;
  };

  this.render();
}
