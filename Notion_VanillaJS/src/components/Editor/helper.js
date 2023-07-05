function isAppliedAlign($parent, style) {
  const [, align] = style.split('/');
  return (
    $parent.style.display === 'flex' && $parent.style.justifyContent === align
  );
}

function isAppliedStyle($parent, style) {
  if (isAlign(style)) return isAppliedAlign($parent, style);

  const [property, styleType] = style.split('/');

  return $parent.style[property] === styleType;
}

function applyAlign($parent, style) {
  const [, align] = style.split('/');
  $parent.style.display = 'flex';
  $parent.style.justifyContent = align;
}

export function applyStyle($parent, style) {
  if (isAlign(style)) {
    applyAlign($parent, style);
    return;
  }

  const [property, styleType] = style.split('/');

  $parent.style[property] = styleType;
}

export function deleteStyle(selection, range, $parent) {
  range.selectNode($parent);
  const innerText = document.createTextNode($parent.innerText);
  range.deleteContents();
  range.insertNode(innerText);
  selection.removeAllRanges();
}

const isSpan = ($parent) => $parent.tagName === 'SPAN';

export const isApplied = ($parent, style) =>
  isSpan && isAppliedStyle($parent, style);

export const isSafeRange = (range) =>
  range.startContainer === range.endContainer;

export const isDefaultAlign = ($parent, style) =>
  $parent.style.display !== 'flex' && style === 'align/start';

export const isFlex = ($parent) => $parent.style.display === 'flex';

export const isAlign = (style) => style.includes('align');

export function focusLastChar($content) {
  const range = document.createRange();
  const selection = getSelection();

  range.selectNodeContents($content);
  range.collapse();
  selection.removeAllRanges();
  selection.addRange(range);
}
