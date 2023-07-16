export const applyTextStyle = ({ $textMenu, color, backgroundColor }) => {
  document.execCommand('foreColor', false, color || 'inherit');
  document.execCommand('backColor', false, backgroundColor || 'inherit');
  $textMenu.removeAttribute('open');
};

export const toggleTextStyleMenu = ({ $textMenu }) => {
  if ($textMenu.hasAttribute('open')) $textMenu.removeAttribute('open');
  else $textMenu.setAttribute('open', 'true');
};
