import { ERROR_MSG } from '../constants/error.js'

export default function convertMarkdownToHTML (markdownText) {
  // 새로 만들어진 컨텐츠의 경우 null이 들어있어서 해당 경우 빈 문자열을 내려줌
  if (markdownText === null) {
    return ''
  }
  if (typeof markdownText !== 'string') {
    throw new TypeError(ERROR_MSG.INVALID_STRING_TYPE)
  }

  return marked.parse(markdownText)
}
