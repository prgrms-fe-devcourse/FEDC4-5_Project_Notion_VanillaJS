import { validateString } from './validation';
import { errorMessages } from '../constants';

test('문자열이 아니면 오류 발생 o, 테스트 통과', () => {
  expect(() => {
    validateString({ title: 123, content: 'Hello' });
  }).toThrowError(errorMessages.NEED_STRING_TYPE);

  expect(() => {
    validateString({ title: 'Hello', content: null });
  }).toThrowError(errorMessages.NEED_STRING_TYPE);

  expect(() => {
    validateString({ title: 'Hello', content: {} });
  }).toThrowError(errorMessages.NEED_STRING_TYPE);
});

test('문자열이면 오류 발생 x, 테스트 통과', () => {
  expect(() => {
    validateString({ title: 'Hello', content: 'World' });
  }).not.toThrow();

  expect(() => {
    validateString({ title: '', content: '' });
  }).not.toThrow();
});
