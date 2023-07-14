import CARET from '@consts/caret';

import { getCaretSpanTagRegex } from './regex';

const savePosition = () => {
  const $caret = document.createElement('span');
  $caret.id = CARET.ID;

  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  range.insertNode($caret);
};

const setPosition = () => {
  const $caret = document.getElementById(CARET.ID);

  if (!$caret) return;

  const range = document.createRange();
  range.selectNode($caret);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  range.deleteContents();
};

const caretSpanTagRegex = getCaretSpanTagRegex();

const getStrippedString = (string) => string.replace(caretSpanTagRegex, '');

const getPositionInString = (string) => {
  const pos = caretSpanTagRegex.exec(string);
  return pos === null ? 0 : pos.index;
};

const Caret = {
  savePosition,
  setPosition,
  getStrippedString,
  getPositionInString,
};

export default Caret;
