import AddCircleIcon from '@public/add_circle.svg';

import { SIDEBAR } from '@consts/target';

import Component from '@core/Component';

import './SidebarCreateButton.css';

export default class SidebarCreateButton extends Component {
  initComponent() {
    const { textContent } = this.props;
    this.$button = document.createElement('button');
    this.$button.className = SIDEBAR.CREATE_BUTTON;
    this.$button.innerHTML = `
      <img src="${AddCircleIcon}" alt="Image" height="22" width="22">
      <span>${textContent}</span>
    `;

    this.$target.appendChild(this.$button);
  }

  setEvent() {
    const { onClick } = this.props;
    this.$button.addEventListener('click', () => {
      onClick();
    });
  }
}
