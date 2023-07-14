import { toggleSet } from './toggleSet';

test('Set의 value를 토글하는 toggleSet함수 테스트', () => {
  const set = new Set([1, 2, 3]);

  toggleSet(set, 2);
  expect(set.has(2)).toBe(false);

  toggleSet(set, 2);
  expect(set.has(2)).toBe(true);

  toggleSet(set, 4);
  expect(set.has(4)).toBe(true);
});
