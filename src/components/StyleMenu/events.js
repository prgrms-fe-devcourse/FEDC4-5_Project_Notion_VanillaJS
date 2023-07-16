import { applyTextStyle, toggleTextStyleMenu } from './richLogics.js';

export const onClickMenuItem = (e, { $menu, $textMenu }) => {
  const command = e.target.closest('[data-command]')?.dataset.command;
  const role = e.target.closest('[data-role]')?.dataset.role;
  const color = e.target.closest('[data-color]')?.dataset.color;
  const backgroundColor = e.target.closest('[data-background-color]')?.dataset.backgroundColor;

  if (command) document.execCommand(command, false, null);
  if (role && role === 'toggleTextMenu') toggleTextStyleMenu({ $textMenu });
  if (role && role === 'applyTextStyle') applyTextStyle({ $textMenu, color, backgroundColor });
};
