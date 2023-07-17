import Button from '@components/ui/Button';

import { RouteService } from '@utils/RouteService';
import validateComponent from '@utils/validateComponent';

export default function NavBar({ targetElement, documentPath }) {
  validateComponent(this, NavBar);
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.render = () => {
    targetElement.innerHTML = '';
    documentPath.slice(0, documentPath.length - 1)?.forEach(({ id, title }) => {
      const linkElement = document.createElement('button');
      targetElement.appendChild(linkElement);
      new Button({
        targetElement: linkElement,
        textContent: title === '' ? '제목없음' : title,
        onClick: () => {
          const router = new RouteService();
          router.push(`/documents/${id}`);
        },
      });
    });
  };

  this.init();
}
