import CARET from '@consts/caret';
import { htmlEntities, reservedCharacters } from '@consts/html';

export const getHTMLTagRegex = (tagName, options = 'g') =>
  new RegExp(`<${tagName}>(.*?)</${tagName}>`, options);

export const getHTMLTagFullMatchRegex = (tagName) =>
  new RegExp(`^<${tagName}>(.*?)</${tagName}>$`);

export const getHTMLEntityRegex = (options = 'g') =>
  new RegExp(Object.keys(reservedCharacters).join('|'), options);

export const getReservedCharacterRegex = (options = 'g') =>
  new RegExp(Object.keys(htmlEntities).join('|'), options);

export const getCaretSpanTagRegex = () => new RegExp(CARET.SPAN(CARET.ID));

export const getKoreanRegex = () => /[\u3131-\uD79D]/;
