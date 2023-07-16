const template = (function () {
  const colorListItem = ({ name, color, backgroundColor }) => `
    <li
      class="text-style-menu__item"
      data-role="applyTextStyle"
      data-color="${color}"
      data-background-color="${backgroundColor}"
      style="color: ${color};"
    >
      <span class="text-style-menu__item--preview" style="background-color: ${backgroundColor};">A</span>
      <span class="text-style-menu__item--word">${name}</span>
    </li>
  `;

  const colorList = ({ colors = [], title = '' }) => `
    <div class="text-style-menu__title">${title}</div>
    <ul class="text-style-menu__list">
      ${colors.map(colorListItem).join('')}
    </ul>
  `;

  return { colorList };
})();

export default template;
