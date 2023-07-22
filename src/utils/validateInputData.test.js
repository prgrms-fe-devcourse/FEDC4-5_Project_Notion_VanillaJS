import { validateInputData } from './validation';
const NEED_STRING_TYPE = '제목과 내용은 문자열이어야 합니다!';

test.each([
  [{ title: 123, content: 'str' }],
  [{ title: true, content: 'str' }],
  [{ title: [], content: 'str' }],
  [{ title: 'str', content: null }],
  [{ title: 'str', content: {} }],
  [{ title: 'str', content: undefined }],
])('문자열이 아닌 경우 오류가 발생한다', (input) => {
  expect(() => {
    validateInputData(input);
  }).toThrowError(NEED_STRING_TYPE);
});

test.each([[{ title: '', content: '' }], [{ title: 'str', content: 'str' }]])(
  '문자열이면 오류가 발생하지 않는다.',
  (input) => {
    expect(() => {
      validateInputData(input);
    }).not.toThrow();
  },
);
