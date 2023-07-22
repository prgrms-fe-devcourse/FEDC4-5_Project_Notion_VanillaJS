import { validateComponent } from './validation';
const NEED_NEW_KEYWORD = 'new 키워드를 붙여주세요!';

test('컴포넌트 생성시 new 키워드 붙였는지 여부 테스트', () => {
  function Component() {
    validateComponent(new.target);
    this.state = 0;
  }

  expect(() => {
    Component();
  }).toThrowError(NEED_NEW_KEYWORD);
});
