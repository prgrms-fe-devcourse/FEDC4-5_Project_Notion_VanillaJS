import CARET from '@consts/caret';

import Caret from './caret';
import HTMLString from './html';
import MarkDownString from './markdown';

let caretPosition = 0;

const parse = (string) => {
  if (!string) return '';

  const headString = new MarkDownString(string.substring(0, caretPosition))
    .replaceReservedCharacters()
    .valueOf();

  const tailString = new MarkDownString(string.substring(caretPosition))
    .replaceReservedCharacters()
    .valueOf();

  const stringWithCaret = `${headString}${CARET.SPAN(CARET.ID)}${tailString}`;
  const markDownString = new MarkDownString(stringWithCaret);

  const html = markDownString
    .splitWithNewLine()
    .map((line) => {
      if (line.isHeading(1)) return line.toHTMLHeading(1);
      if (line.isHeading(2)) return line.toHTMLHeading(2);
      if (line.isHeading(3)) return line.toHTMLHeading(3);

      if (line.valueOf() === CARET.SPAN(CARET.ID))
        return `${CARET.SPAN(CARET.ID)}<br>`;
      if (line.valueOf() === '') return '<br>';

      return `${line}`;
    })
    .map((line) => `<div>${line}</div>`)
    .join('');

  return html;
};

const stringify = (html) => {
  if (!html) return '';

  const htmlString = new HTMLString(html);

  const string = htmlString
    .splitWithTag('div')
    .map((line) => {
      if (line.isEmptyLine()) return '';
      if (line.isEmptyLineWithCaret()) return CARET.SPAN(CARET.ID);

      if (line.isHeading(1)) return line.toMarkDownHeading(1);
      if (line.isHeading(2)) return line.toMarkDownHeading(2);
      if (line.isHeading(3)) return line.toMarkDownHeading(3);

      // TODO: list 태그인지 확인
      return line.replaceHTMLEntities().replaceAll('<br>', '\n');
    })
    .join('\n');

  caretPosition = Caret.getPositionInString(string);
  const stringWithoutCaret = Caret.getStrippedString(string);

  return stringWithoutCaret;
};

const saveCaretPosition = () => {
  Caret.savePosition();
};

const restoreCaretPosition = () => {
  Caret.setPosition();
};

const Editor = { parse, stringify, saveCaretPosition, restoreCaretPosition };

export default Editor;
