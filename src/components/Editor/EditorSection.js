export default function EditorSection({ $parent }) {
  const $section = document.createElement('div');
  $section.classList.add('editor');

  $parent.appendChild($section);
}
