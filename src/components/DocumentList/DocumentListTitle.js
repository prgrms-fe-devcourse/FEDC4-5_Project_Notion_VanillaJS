export default function DocumentListTitle({ $parent }) {
  const $title = document.createElement('div');
  $title.textContent = '😮 주연의 Notion';
  $parent.appendChild($title);
}
