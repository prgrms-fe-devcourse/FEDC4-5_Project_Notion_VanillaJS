import { foreColors, backColors } from '../../constants/colors.js';
import { onClickMenuItem } from './events.js';
import template from './templates.js';
import './StyleMenu.css';

export default class StyleMenu {
  constructor({
    $menu,
    initialState = {
      isShowMenu: false,
      isShowTextMenu: false,
      pageX: 0,
      pageY: 0,
    },
    $textMenu,
  }) {
    this.state = initialState;

    this.$menu = $menu;
    this.$textMenu = $textMenu;
    this.$textMenu.innerHTML += template.colorList({ colors: foreColors, title: '색' });
    this.$textMenu.innerHTML += template.colorList({ colors: backColors, title: '배경' });

    this.initEvents();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  initEvents() {
    const { $menu, $textMenu } = this;

    $menu.addEventListener('click', (e) => onClickMenuItem(e, { $menu, $textMenu }));
    $textMenu.addEventListener('click', (e) => onClickMenuItem(e, { $menu, $textMenu }));
  }

  render() {
    const { $menu, $textMenu, state } = this;
    const { isShowMenu, isShowTextMenu, pageX, pageY } = state;

    $menu.style.left = `${pageX}px`;
    $menu.style.top = `${pageY}px`;
    $textMenu.style.left = `${pageX + 130}px`;
    $textMenu.style.top = `${pageY + 40}px`;

    if (isShowMenu) $menu.classList.remove('hidden');
    else $menu.classList.add('hidden');

    if (isShowTextMenu) $textMenu.classList.remove('hidden');
    else $textMenu.classList.add('hidden');
  }
}
