import validateComponent from '../utils/validateComponent';
import { RouteService } from '../utils/RouteService';

const homeBtnHandler = (e) => {
  if (!e.target.closest('.not-found-page-home-btn')) return;
  const router = new RouteService();
  router.push('/');
};

export default function NotFoundPage({ targetElement }) {
  validateComponent(this, NotFoundPage);
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.setEvent = () => {
    targetElement.removeEventListener('click', homeBtnHandler);
    targetElement.addEventListener('click', homeBtnHandler);
  };

  this.render = () => {
    targetElement.innerHTML = `
      <div class="not-found-page-outer">
        <span class="not-found-page-inner">
          <div class="not-found-page-home-btn">📘 이진욱의 Notion</div>
          존재하지 않는 페이지입니다.
        </span>
      </div>
    `;
  };

  this.init();
}
