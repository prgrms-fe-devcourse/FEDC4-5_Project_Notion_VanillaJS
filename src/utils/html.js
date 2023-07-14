import CARET from '@consts/caret';
import { reservedCharacters } from '@consts/html';

import Caret from './caret';
import {
  getHTMLEntityRegex,
  getHTMLTagFullMatchRegex,
  getHTMLTagRegex,
} from './regex';

const htmlEntityRegex = getHTMLEntityRegex();

export default class HTMLString extends String {
  replaceHTMLEntities() {
    return new HTMLString(
      this.replaceAll(htmlEntityRegex, (match) => reservedCharacters[match])
    );
  }

  splitWithTag(tagName) {
    const tags = [];
    const tagRegex = getHTMLTagRegex(tagName);

    let { lastIndex } = tagRegex;

    let match = tagRegex.exec(this);
    if (match === null) {
      tags.push(this);
      return tags;
    }

    while (match) {
      if (lastIndex < match.index) {
        const text = this.substring(lastIndex, match.index);
        tags.push(new HTMLString(text));
      }

      const [, matchText] = match;
      tags.push(new HTMLString(matchText));

      lastIndex = tagRegex.lastIndex;
      match = tagRegex.exec(this);
    }

    return tags;
  }

  isEmptyLine() {
    return this.valueOf() === '<br>';
  }

  isEmptyLineWithCaret() {
    return this.valueOf() === `${CARET.SPAN(CARET.ID)}<br>`;
  }

  isHeading(level = 1) {
    if (level < 1 || level > 6) return false;
    const noneCaretString = new HTMLString(
      Caret.getStrippedString(this.valueOf())
    );

    const headingRegex = getHTMLTagFullMatchRegex(`h${level}`);
    return headingRegex.exec(noneCaretString.replaceHTMLEntities().valueOf());
  }

  toMarkDownHeading(level = 1) {
    const headingRegex = getHTMLTagFullMatchRegex(`h${level}`);
    const [, heading] = headingRegex.exec(this.replaceHTMLEntities().valueOf());
    return `${'#'.repeat(level)} ${heading}`;
  }
}
