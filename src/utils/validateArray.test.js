import { validateArray } from './validation';
const NEED_ARRAY_TYPE = '배열로 입력해야 합니다!';

test.each([[undefined], [null], [{}], ['str'], [123], [true]])('배열이 아니면 오류가 발생한다.', (input) => {
  expect(() => {
    validateArray(input);
  }).toThrowError(NEED_ARRAY_TYPE);
});

test.each([[[]], [[1, 2, 3]]])('배열이면 오류가 발생하지 않는다.', (input) => {
  expect(() => {
    validateArray(input);
  }).not.toThrow();
});
