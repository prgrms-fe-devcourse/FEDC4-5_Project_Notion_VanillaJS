import { validateComponent } from '../../utils/validation';

const HOME_TITLE = '노션 클로닝 프로젝트';
const ADD_PAGE_MESSAGE = '페이지 추가 버튼으로 새 글을 작성해 보세요.';
const ADD_BUTTON_MESSAGE = '➕로 글을 추가하거나';
const DELETE_BUTTON_MESSAGE = '➖로 글을 삭제할 수 있어요.';
const BACK_TO_HOME = '유저명을 누르면 홈으로 돌아올 수 있어요!';

export default function HomePage({ $target }) {
  validateComponent(new.target);

  const $homePage = document.createElement('div');
  $homePage.classList.add('home-page');

  this.render = () => {
    $target.appendChild($homePage);
    $homePage.innerHTML = `
    <h1 class="home-title">📝${HOME_TITLE}</h1>
    <ul class="home-list">
      <li class="home-list__text">✅${ADD_PAGE_MESSAGE}</li><br>
      <li class="home-list__text">✅${ADD_BUTTON_MESSAGE} ${DELETE_BUTTON_MESSAGE}</li><br>
      <li class="home-list__text">✅${BACK_TO_HOME}</li>
    </ul>
    `;
  };

  this.render();
}
