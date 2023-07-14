import { validateArray } from './validation';
import { errorMessages } from '../constants';

test('배열이 아니면 오류 발생 o, 테스트 통과', () => {
  expect(() => {
    validateArray(undefined);
  }).toThrowError(errorMessages.NEED_ARRAY_TYPE);

  expect(() => {
    validateArray(null);
  }).toThrowError(errorMessages.NEED_ARRAY_TYPE);

  expect(() => {
    validateArray({});
  }).toThrowError(errorMessages.NEED_ARRAY_TYPE);

  expect(() => {
    validateArray('배열x');
  }).toThrowError(errorMessages.NEED_ARRAY_TYPE);
});

test('배열이면 오류 발생 x, 테스트 통과', () => {
  expect(() => {
    validateArray([]);
  }).not.toThrow();

  expect(() => {
    validateArray([1, 2, 3]);
  }).not.toThrow();
});
