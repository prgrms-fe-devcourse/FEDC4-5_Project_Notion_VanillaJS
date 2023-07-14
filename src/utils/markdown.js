import { htmlEntities } from '@consts/html';

import Caret from './caret';
import { getReservedCharacterRegex } from './regex';

const reservedCharacterRegex = getReservedCharacterRegex();

export default class MarkDownString extends String {
  replaceReservedCharacters() {
    return new MarkDownString(
      this.replaceAll(reservedCharacterRegex, (match) => htmlEntities[match])
    );
  }

  splitWithNewLine() {
    return this.split('\n').map((line) => new MarkDownString(line));
  }

  isHeading(level) {
    if (level < 1 || level > 6) return false;
    const nbsp = htmlEntities[' '];
    const noneCaretString = Caret.getStrippedString(this.valueOf());

    return noneCaretString.indexOf(`${'#'.repeat(level)}${nbsp}`) === 0;
  }

  removeHeadingMark(level) {
    const nbsp = htmlEntities[' '];
    return this.replace(`${'#'.repeat(level)}${nbsp}`, '');
  }

  toHTMLHeading(level = 1) {
    const string = this.removeHeadingMark(level);

    return `<h${level}>${string}</h${level}>`;
  }
}
