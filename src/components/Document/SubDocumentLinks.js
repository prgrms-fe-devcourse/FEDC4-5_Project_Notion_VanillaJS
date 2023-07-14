import { RouteService } from '../../utils/RouteService';
import validateComponent from '../../utils/validateComponent';

export default function SubDocumentLinks({ targetElement, subDocuments }) {
  validateComponent(this, SubDocumentLinks);
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.setEvent = () => {
    targetElement.addEventListener('click', (e) => {
      if (!e.target.closest('.sub-document-links > button')) return;
      const router = new RouteService();
      router.push(`/documents/${e.target.dataset.id}`);
    });
  };

  this.render = () => {
    targetElement.innerHTML = '';
    subDocuments.forEach(({ id, title }) => {
      const buttonElement = document.createElement('button');
      buttonElement.classList.add('sub-document-link-btn');
      buttonElement.setAttribute('data-id', id);
      buttonElement.textContent = title === '' ? '제목없음' : title;
      targetElement.appendChild(buttonElement);
    });
  };

  this.init();
}
