import { StyleMenu } from '../../components/index.js';

export default function createStyleMenu() {
  const { $target } = this;

  return new StyleMenu({
    $menu: $target.querySelector('.style-menu'),
    $textMenu: $target.querySelector('.text-style-menu'),
  });
}
